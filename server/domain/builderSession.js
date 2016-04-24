'use strict';

var debug = require('debug')('uib:server:domain:builderSession'),
    R = require('ramda'),
    Q = require('q'),
    sessionModel = require('../models/session');

function tail(arr) {
  return arr.length ? arr[arr.length - 1] : null;
}

function oneSession(query) {
  debug('Find one session by query %s', JSON.stringify(query));
  return Q.ninvoke(sessionModel, 'findOne', query);
}

function allSessions(query) {
  debug('All sessions by %s', JSON.stringify(query));
  return Q.ninvoke(sessionModel, 'find', query);
}

module.exports.getSessionInitialsBySessionId = function(req) {
  debug('Try to get session initials by session id');
  if (!req.params.sessionId) {
    throw new Error('Session id has not been provided');
  }
  return Q.ninvoke(sessionModel, 'findById', req.params.sessionId).then(function(session) {
    debug('Session is here');
    return session.initial;
  });
};

module.exports.setSessionInitialsBySessionId = function(req) {
  debug('Try to get session initials by session id');
  if (!req.params.sessionId) {
    throw new Error('Session id has not been provided');
  }
  return Q.npost(sessionModel, 'findByIdAndUpdate', [req.params.sessionId, {initial:req.body.initial}]);
};

module.exports.validateSessionSnapshotPayload = function(req) {
  debug('Validate session snapshot payload');
  var sessionId = req.params.sessionId;
  if (!sessionId) {
    throw new Error('Session has not been found');
  }

  if (typeof req.body.tree === 'undefined') {
    throw new Error('Tree has not been provided for a new snapshot');
  }

  return [sessionId, (req.body.tree.trim() || '')];
};

module.exports.getSessionSnapshotById = R.curry(function(snapshotId, session) {
  debug('get snapshot by id %s for session %s', snapshotId, session.id);
  return Q.promise(function(resolve) {
    var snapshot = snapshotId ? session.snapshots.id(snapshotId) : tail(session.snapshots);
    return resolve([session, snapshot]);
  });
});

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
  var title = req.body.title.trim() || '';
  var initial = {
    html: req.body.initialSetup.html.trim() || '',
    css: req.body.initialSetup.css.trim() || '',
    js: req.body.initialSetup.js.trim() || ''
  };
  return [userData._id, title, initial];
};

module.exports.startNew = function(userId, title, initialCode) {
  debug('Starting a new builder session');

  var newSession = new sessionModel({
    sharedId: Math.random().toString(16).substr(2),
    owner: userId,
    title: title,
    initial: initialCode,
    snapshots: []
  });

  return Q.ninvoke(newSession, 'save');
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
  return Q.ninvoke(sessionModel, 'findOneAndUpdate', query, newSessionData, {});
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
