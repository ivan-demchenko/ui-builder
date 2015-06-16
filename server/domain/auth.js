'use strict';

var Q = require('q'),
    User = require('../models/user'),
    debug = require('debug')('server:domain:auth'),
    token = require('../token');

function findUser(username) {
  debug('Attempt to find a user by username %s ', username);
  return Q.Promise(function(resolve, reject) {
    User.findOne({username: username}).then(function(res) {
      if (res) {
        debug('... User has been found');
        resolve(res);
      } else {
        debug('... User has not been found');
        reject(null);
      }
    });
  });
}

function addUser(username, password, cb) {
  debug('Adding a new user %s', username);

  var newUser = new User({
    username: username,
    password: password
  });

  newUser.save(cb);
}

module.exports.registerPayloadCorrect = function(req) {
  debug('Check register payload');
  return Q.Promise(function(resolve, reject) {
    var username = req.body.username.trim() || '';
    var password = req.body.password.trim() || '';
    var passwordConfirmation = req.body.passwordConfirmation.trim() || '';

    if (username === '' || password === '' || passwordConfirmation === '') {
      return reject(new Error('Login data is not provided'));
    }

    if (password !== passwordConfirmation) {
      return reject(new Error('Login data is not provided'));
    }

    resolve([username, password]);
  });
};

module.exports.loginPayloadCorrect = function(req) {
  debug('Check login payload');
  return Q.Promise(function(resolve, reject) {
    var username = req.body.username.trim() || '';
    var password = req.body.password.trim() || '';

    if (username === '' || password === '') {
      return reject(new Error('Login data has not been provided'));
    }

    resolve([username, password]);
  });
};


module.exports.registerUser = function(username, password) {
  debug('Attempt to register a new user: %s', username);

  return findUser(username).then(
    function() {
      throw new Error('User already exists.');
    },
    function() {
      return Q.nfcall(addUser, username, password);
    }
  );
};

module.exports.logUserIn = function(username, password) {
  debug('Try to log user in');

  return findUser(username).then(function(user) {
    debug('User has been found, compare passwords');
    return user.comparePassword(password).then(function() {
      return token.create(user);
    });
  });
};

module.exports.logUserOut = function(userData) {
  debug('Attempt to logout');
  return token.expire(userData.token);
};
