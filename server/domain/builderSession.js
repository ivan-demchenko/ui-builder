'use strict';

var debug = require('debug')('server:domain:builderSession'),
    Q = require('q'),
    sessionModel = require('../models/session');

function tail(arr) {
  return arr.length ? arr[arr.length - 1] : null;
}

function oneSession(query) {
  debug('Find one session by query %s', JSON.stringify(query));
  return Q.Promise(function(resolve, reject) {
    sessionModel.findOne(query).then(function(res) {
      if (res) {
        resolve(res);
      } else {
        reject(new Error('Session has not been found'));
      }
    });
  });
}

function allSessions(query) {
  debug('All sessions by %s', JSON.stringify(query));
  return Q.Promise(function(resolve, reject) {
    sessionModel.find(query).then(function(res) {
      if (res) {
        resolve(res);
      } else {
        reject(new Error('Sessions list can not be build'));
      }
    });
  });
}

module.exports.sessionSnapshotPayloadValid = function(req) {
  debug('Validate session snapshot payload');
  return Q.Promise(function(resolve, reject) {
    var sessionId = req.params.sessionId;
    if (!sessionId) {
      return reject(new Error('Session has not been found'));
    }

    if (typeof req.body.tree === 'undefined') {
      return reject(new Error('Tree has not been provided for a new snapshot'));
    }

    return resolve([sessionId, (req.body.tree.trim() || '')]);
  });
};

module.exports.getSessionSnapshotById = function(snapshotId) {
  return function(session) {
    debug('get snapshot by id %s for session %s', snapshotId, session.id);
    return Q.promise(function(resolve) {
      var snapshot = snapshotId ? session.snapshots.id(snapshotId) : tail(session.snapshots);
      return resolve([session, snapshot]);
    });
  };
};

module.exports.getSessionsBySharedId = function(sharedId) {
  debug('Find a session by shared id %s', sharedId);
  return oneSession({sharedId: sharedId});
};

module.exports.getSessionsById = function(sessionId) {
  debug('Find a session by id %s', sessionId);
  return oneSession({_id: sessionId});
};

module.exports.getNewSessionInitials = function(req, userData) {
  debug('Prepare Initials for the new session');
  return Q.Promise(function(resolve) {
    var title = req.body.title.trim() || '';
    var initial = {
      html: req.body.initialSetup.html.trim() || '',
      css: req.body.initialSetup.css.trim() || '',
      js: req.body.initialSetup.js.trim() || ''
    };
    resolve([userData._id, title, initial]);
  });
};

module.exports.startNew = function(userId, title, initialCode) {
  debug('Starting a new builder session');
  return Q.promise(function(resolve, reject) {
    var sharedId = Math.random().toString(16).substr(2);
    var newSession = new sessionModel({
      sharedId: sharedId,
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

module.exports.fetchSessionId = function(req) {
  return Q.Promise(function(resolve, reject) {
    var sessionId = req.params.sessionId;
    if (sessionId) {
      return resolve(sessionId);
    }
    reject(new Error('Session id has not beed provided'));
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
  debug('Attempt to get assets %s for session id %s', type, sessionId);

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
