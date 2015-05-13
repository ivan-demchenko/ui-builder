'use strict';

var debug = require('debug')('server:routes:api'),
    message = require('./responseMessages'),
    token = require('../token'),
    session = require('../domain/builderSession');

module.exports.startNewSession = function (req, res) {
  token.verify(req.headers, function(err, userData) {
    if (err) {
      return res.sendStatus(401);
    }

    debug('Try to start a new session for user # %s', userData._id);

    session.startNew(userData._id, function(err, sessionObj) {
      if (err || !sessionObj) {
        return res.status(500).json(message.error('Failed to get session id', err));
      }
      return res.json(message.success('New session started', {
        sessionId: sessionObj._id
      }));
    });
  });
};

module.exports.setSessionInitial = function(req, res) {
  token.verify(req.headers, function(err, userData) {
    if (err) {
      return res.sendStatus(401);
    }
    var type = req.body.type.trim() || '';
    var sessionId = req.body.sessionId.trim() || '';
    var code = req.body.code.trim() || '';

    debug('Try to update session');

    session.updateInitial(type, sessionId, userData._id, code, function(err, updatedSession) {
      if (err || !updatedSession) {
        return res.status(500).json(message.error('Unable to update session code', err));
      }
      res.status(500).json(message.success('The ' + type + ' code was injected'));
    });
  });
};
