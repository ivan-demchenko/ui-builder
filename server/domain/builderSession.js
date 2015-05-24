'use strict';

var debug = require('debug')('server:domain:builderSession'),
    Q = require('q'),
    sessionModel = require('../models/session');

function oneSession(params) {
  debug('one session %s', JSON.stringify(params));
  return Q.ninvoke(sessionModel, 'findOne', params);
}

function allSessions(params) {
  return Q.ninvoke(sessionModel, 'find', params);
}

module.exports.getSessionSnapshotById = function(snapshotId) {
  return function(session) {
    return Q.promise(function(resolve) {
      var snapshot = null;
      if (snapshotId) {
        debug('Get snapshot by id');
        snapshot = session.snapshots.id(snapshotId);
      } else if (session.snapshots.length) {
        debug('Get latest snapshot for session %s', session._id);
        snapshot = session.snapshots[session.snapshots.length - 1];
      }
      resolve([session, snapshot]);
    });
  };
};

module.exports.getSessionsBySharedId = function(sharedId) {
  debug('Attempt to find a session by shared id %s', sharedId);
  return oneSession({sharedId: sharedId});
};

module.exports.getSessionsById = function(sessionId) {
  debug('Attempt to find a session %s', sessionId);
  return oneSession({_id: sessionId});
};

module.exports.startNew = function(userId, title, initialCode) {
  debug('Starting a new builder session');
  return Q.promise(function(resolve, reject) {
    var id = Math.random().toString(16).substr(2);
    var newSession = new sessionModel({
      sharedId: id,
      owner: userId,
      title: title,
      initial: initialCode,
      snapshots: []
    });

    newSession.save(function(err) {
      if (err) {
        return reject(new Error(err));
      }

      debug('The new builder session has been saved to DB: %s', newSession._id);

      resolve(newSession);
    });
  });
};

module.exports.updateSession = function(sessionId, ownerId, newSessionData) {
  debug('Updating the initial code for session %s of owner %s', sessionId, ownerId);

  var query = { '_id': sessionId, 'owner': ownerId };
  return Q.promise(function(resolve) {
    sessionModel.findOneAndUpdate(query, newSessionData, {}, function(err, session) {
      if (err) {
        throw new Error(err);
      }
      resolve(session);
    });
  });
};

module.exports.getSessionsByUserId = function(userId) {
  debug('Attempt to get list of sessions for user %s', userId);
  return allSessions({ owner: userId });
};

module.exports.getSessionAsset = function(sessionId, type) {
  debug('Attempt to get assets %s for session id # %s', type, sessionId);

  return oneSession({_id: sessionId}).then(function(session) {
    return session.initial[type];
  });
};

module.exports.appendSnapshotToSession = function(sessionId, snapshotTree) {
  debug('Attempt to save a snapshot for the session %s', sessionId);
  return Q.ninvoke(sessionModel, 'addSnapshot', sessionId, snapshotTree);
};

module.exports.getLastSnapshotBySessionId = function(sessionId) {
  debug('Attempt to fetch the result for the session # %s', sessionId);

  return oneSession({_id: sessionId}).then(function(session) {
    if (session.snapshots.length) {
      return session.snapshots[session.snapshots.length - 1].tree;
    }
    return '[]';
  });
};
