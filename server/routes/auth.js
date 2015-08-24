'use strict';

var debug = require('debug')('uib:server:routes:auth'),
    Q = require('q'),
    authDomain = require('../domain/auth'),
    token = require('../token'),
    responce = require('../helpers/responseHandlers.js');

module.exports.register = function(req, res) {
  debug('Attempt to register');

  Q.fcall(authDomain.registerPayloadCorrect, req)
  .spread(authDomain.registerUser)
  .then(responce.success(res, 'You have registered, now you can login'))
  .catch(responce.error(res));
};

module.exports.login = function(req, res) {
  debug('Attempt to login');

  Q.fcall(authDomain.loginPayloadCorrect, req)
  .spread(authDomain.logUserIn)
  .then(responce.success(res, 'Welcome'))
  .catch(responce.error(res));
};

module.exports.logout = function(req, res) {
  debug('Attempt to logout');

  token.verify(req.headers)
  .then(authDomain.logUserOut)
  .then(responce.success(res, 'Logout success'))
  .catch(responce.error(res));
};
