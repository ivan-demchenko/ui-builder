'use strict';

var debug = require('debug')('server:domain:builderSession'),
    sessionModel = require('../models/session');

function startNew(userId, title, initialCode, done) {
  debug('Starting a new builder session');

  var newSession = new sessionModel({
    owner: userId,
    title: title,
    initial: initialCode,
    snapshots: []
  });

  newSession.save(function(err) {
    if (err) {
      debug('Error while saving new session: %s', err.message);
      return done(err);
    }

    debug('The new builder session has been saved to DB: %s', newSession._id);

    return done(null, newSession);
  });
}

function updateInitial(sessionId, ownerId, newInitial, done) {
  debug('Updating the initial code for sesssion %s of owner %s', sessionId, ownerId);

  var query = { '_id': sessionId, 'owner': ownerId };
  var update = { $set: { initial: newInitial } };

  sessionModel.findOneAndUpdate(query, update, {}, function(err, session) {
    if (err || !session) {
      return done(new Error('Can not find session with id: ' + sessionId));
    }

    debug('Session initials has been updated');

    done(null, session);
  });
}

function getSessionsByUserId(userId, done) {
  debug('Attempt to get list of sessions for user', userId);

  sessionModel.find({ owner: userId }, function(err, list) {
    if (err || !list) {
      return done(err);
    }

    debug('Sessions list has been fetched: %s', list.length);

    return done(null, list);
  });
}

function getSessionInitialCode(sessionId, done) {
  debug('Attempt to get initial code for session: %s', sessionId);

  sessionModel.findOne({_id: sessionId}, 'initial', function(err, initial) {
    if (err) {
      return done(err);
    }

    if (!initial) {
      debug('Session initials have been found');
      return done(null, null);
    }

    return done(null, initial);
  });
}

function getSessionAsset(sessionId, type, done) {
  debug('Attempt to get assets for session id # %s', sessionId);

  sessionModel.findOne({_id: sessionId}, function(err, session) {
    if (err || !session) {
      debug('Failes to find a session %s', sessionId);
      return done(err);
    }

    debug('Session initials have been found');

    return done(null, session.initial[type]);
  });
}

function appendSessionSnapshot(sessionId, snapshotTree, done) {
  debug('Attempt to save a snapshot for the session %s', sessionId);

  sessionModel.addSnapshot(sessionId, snapshotTree, function(err, snapshot) {
    if (err || !snapshot) {
      debug('Failed to save a snapshot the the session %s', sessionId);
      return done(err);
    }

    debug('A new snapshot for the session %s has been saved', sessionId);

    return done(null, snapshot);
  });
}

function getLastSnapshotBySessionId(sessionId, done) {
  debug('Attempt to fetch the result for the session # %s', sessionId);

  sessionModel.findOne({_id: sessionId}, function(err, session) {
    if (err || !session) {
      debug('Failes to find a session %s', sessionId);
      return done(err);
    }

    debug('Session has been found');
    if (session.snapshots.length) {
      return done(null, session.snapshots[session.snapshots.length - 1].tree || '');
    } else {
      return done(null, '');
    }
  });
}

module.exports.startNew = startNew;
module.exports.updateInitial = updateInitial;
module.exports.getSessionsByUserId = getSessionsByUserId;
module.exports.getSessionInitialCode = getSessionInitialCode;
module.exports.getSessionAsset = getSessionAsset;
module.exports.appendSessionSnapshot = appendSessionSnapshot;
module.exports.getLastSnapshotBySessionId = getLastSnapshotBySessionId;
