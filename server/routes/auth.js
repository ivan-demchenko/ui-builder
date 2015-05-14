'use strict';

var debug = require('debug')('server:routes:auth'),
    authDomain = require('../domain/auth'),
    message = require('./responseMessages');

module.exports.register = function (req, res) {
  var username = req.body.username.trim() || '';
  var password = req.body.password.trim() || '';
  var passwordConfirmation = req.body.passwordConfirmation.trim() || '';

  if (username === '' || password === '' || password !== passwordConfirmation) {
    return res.status(400).json(message.error('Form is empty'));
  }

  authDomain.registerUser(username, password, function(err) {
    if (err) {
      return res.status(500).send(message.error('Trouble while registering a new user', err));
    }
    return res.status(200).json(message.success('A new user has successfully been registered'));
  });
};

module.exports.login = function (req, res) {
  var username = req.body.username.trim() || '';
  var password = req.body.password.trim() || '';

  debug('Atempt to login using %s and %s', username, password);

  if (username === '' || password === '') {
    return res.status(401).json(message.error('Login data has not been provided'));
  }

  authDomain.logUserIn(username, password, function(err, loggenInUserObj) {
    if (err) {
      debug('User has not been found in DB');
      return res.status(401).send(message.error('Error while logging user in', err));
    }
    debug('User has been found');
    return res.status(200).json(message.success('Welcome!', loggenInUserObj));
  });
};

module.exports.logout = function (req, res) {
  if (req.user) {
    return authDomain.expire(req.headers, function() {
      delete req.user;
      return res.send(200);
    });
  } else {
    return res.send(401);
  }
};
