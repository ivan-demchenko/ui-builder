'use strict';

var debug = require('debug')('server:routes:auth'),
    authDomain = require('../domain/auth'),
    token = require('../token'),
    responce = require('../helpers/responseHandlers.js');

module.exports.register = function(req, res) {
  debug('Attempt to register');

  authDomain
  .registerPayloadCorrect(req)
  .spread(authDomain.registerUser)
  .then(
    responce.success(res, 'You have registered, now you can login'),
    responce.error(res)
  )
  .catch(responce.error(res));
};

module.exports.login = function(req, res) {
  debug('Attempt to login');

  authDomain
  .loginPayloadCorrect(req)
  .spread(authDomain.logUserIn)
  .then(
    responce.success(res, 'Welcome'),
    responce.error(res, 'Ooops')
  )
  .catch(responce.error(res, 'Error while logging user in'));
};

module.exports.logout = function(req, res) {
  debug('Attempt to logout');

  token.verify(req.headers)
  .then(authDomain.logUserOut)
  .then(
    responce.success(res, 'Logout success'),
    responce.error('Logout failed')
  )
  .catch(responce.error(res, 'Logout failed'));
};
