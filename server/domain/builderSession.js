'use strict';

var debug = require('debug')('server:domain:builderSession'),
    sessionModel = require('../models/session');

function startNew(userId, title, initialCode, done) {

  debug('Starting a new builder session');

  var newSession = new sessionModel({ 'owner': userId, title: title, initial: initialCode });
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

function getUserSessions(userId, done) {

  debug('Attempt to get list of sessions for user', userId);

  sessionModel.find({owner: userId}, function(err, list) {
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
    if (err || !initial) {
      return done(err);
    }
    debug('Session initials have been found');
    return done(null, initial);
  });
}

module.exports.startNew = startNew;
module.exports.updateInitial = updateInitial;
module.exports.getUserSessions = getUserSessions;
module.exports.getSessionInitialCode = getSessionInitialCode;
