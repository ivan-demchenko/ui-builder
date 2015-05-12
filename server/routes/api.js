'use strict';

var debug = require('debug')('server:routes:api'),
    message = require('./responseMessages'),
    token = require('../token'),
    session = require('../domain/builderSession');

module.exports.startNewSession = function (req, res) {
  token.verify(req.headers, function(err, userData) {
    if (err) {
      res.sendStatus(401);
    }

    debug('Try to start new session for user %s', userData);

    session.startNew(userData._id, function(err, sessionObj) {
      if (err || !sessionObj) {
        res.status(500).json(message.error('Failed to get session id', err));
      }
      res.json(message.success('New session started', {
        sessionId: sessionObj._id
      }));
    });
  });
};
