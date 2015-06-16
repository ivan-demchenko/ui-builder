'use strict';

var debug = require('debug')('server:routes:auth'),
    authDomain = require('../domain/auth'),
    token = require('../token'),
    message = require('./responseMessages');

function serverError(res) {
  return function(reason) {
    debug(reason);
    return res.status(500).json(message.error(reason));
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

  if (username === '' || password === '' || passwordConfirmation === '') {
    return serverError(res, 'Form is empty')(new Error('Form is empty'));
  }

  if (password !== passwordConfirmation) {
    return serverError(res, 'Please enter the same password two times')(new Error('Please enter the same password two times'));
  }

  authDomain
  .registerUser(username, password)
  .then(
    success(res, 'Hi ' + username + '! You have registered, now you can login'),
    serverError(res)
  )
  .catch(serverError(res));
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
