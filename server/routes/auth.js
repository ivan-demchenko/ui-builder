'use strict';

var debug = require('debug')('server:routes:auth'),
    authDomain = require('../domain/auth'),
    token = require('../token'),
    message = require('./responseMessages');

function serverError(res, msg) {
  return function(err) {
    debug(msg, err);
    return res.status(500).json(message.error(msg, err));
  };
}

function success(res, msg) {
  return function(data) {
    debug(msg, data);
    return res.status(200).json(message.success(msg, data));
  };
}

module.exports.register = function(req, res) {
  var username = req.body.username.trim() || '';
  var password = req.body.password.trim() || '';
  var passwordConfirmation = req.body.passwordConfirmation.trim() || '';

  if (username === '' || password === '' || password !== passwordConfirmation) {
    return serverError(res, 'Form is empty')(new Error('Form is empty'));
  }

  authDomain
  .registerUser(username, password)
  .then(success(res, 'A new user has successfully been registered'), serverError(res, 'Trouble while registering a new user'))
  .catch(serverError(res, 'Trouble while registering a new user'));
};

module.exports.login = function(req, res) {
  var username = req.body.username.trim() || '';
  var password = req.body.password.trim() || '';

  debug('Atempt to login using %s and %s', username, password);

  if (username === '' || password === '') {
    return serverError(res, 'Login data has not been provided')(new Error('Login data has not been provided'));
  }

  authDomain
  .logUserIn(username, password)
  .then(success(res, 'Welcome'), serverError(res, 'Ooops'))
  .catch(serverError(res, 'Error while logging user in'));
};

module.exports.logout = function(req, res) {
  debug('Attempt to logout');

  token.verify(req.headers)
  .then(authDomain.logUserOut)
  .then(success(res, 'Logout success'), serverError('Logout failed'))
  .catch(serverError(res, 'Logout failed'));
};
