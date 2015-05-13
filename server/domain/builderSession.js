'use strict';

var debug = require('debug')('server:domain:builderSession'),
    sessionModel = require('../models/session');

function startNew(userId, done) {

  debug('Starting a new builder session');

  var newSession = new sessionModel({ 'owner': userId });
  newSession.save(function(err) {
    if (err) {
      debug('Error while saving new session: %s', err.message);
      return done(err);
    }

    debug('The new builder session has been saved to DB: %s', newSession._id);

    return done(null, newSession);
  });
}

function updateInitial(type, sessionId, ownerId, code, done) {

  debug('Updating the %s code for sesssion %s and owner %s', type, sessionId, ownerId);

  sessionModel.findOne({'_id': sessionId, 'owner': ownerId}, function(err, session) {
    if (err || !session) {
      return done(new Error('Can not find session with id: ' + sessionId));
    }

    debug('Session exists in DB');

    var methodName = 'set' + type.toUpperCase();

    session[methodName](code, function(err, updatedSession) {
      if (err || !updatedSession) {
        return done(err);
      }

      debug('Session updated');

      return done(null, updatedSession);
    });
  });
}

module.exports.startNew = startNew;
module.exports.updateInitial = updateInitial;
