'use strict';

var Q = require('q'),
    _ = require('lodash'),
    User = require('../models/user'),
    debug = require('debug')('uib:server:domain:auth'),
    token = require('../token');

function findUser(username) {
  debug('Attempt to find a user by username %s ', username);
  return Q.ninvoke(User, 'findOne', {username: username});
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

  var username = req.body.username.trim() || '';
  var password = req.body.password.trim() || '';
  var passwordConfirmation = req.body.passwordConfirmation.trim() || '';

  if (username === '' || password === '' || passwordConfirmation === '') {
    return new Error('Data is not provided');
  }

  if (password !== passwordConfirmation) {
    throw new Error('Password and password confirmation do not match');
  }

  return [username, password];
};

module.exports.loginPayloadCorrect = function(req) {
  debug('Check login payload');

  var username = req.body.username.trim() || '';
  var password = req.body.password.trim() || '';

  if (!username || !password) {
    throw new Error('Please, enter username and password');
  }

  return [username, password];
};


module.exports.registerUser = function(username, password) {
  debug('Attempt to register a new user: %s', username);

  return findUser(username).then(
    function() {
      throw new Error('This user name is already taken, I am afraid');
    },
    function() {
      return Q.nfcall(addUser, username, password);
    }
  );
};

module.exports.logUserIn = function(username, password) {
  debug('Try to log user in');

  return findUser(username).then(function(user) {
    if (_.isNull(user)) {
      throw new Error('Looks like there is no such user');
    }

    debug('User has been found, compare passwords');

    return user.comparePassword(password).then(function(match) {
      if (!match) {
        throw new Error('You have entered incorrect password');
      }

      debug('Passwords do match! So we can generate token now!');

      return token.create(user);
    });
  });
};

module.exports.logUserOut = function(userData) {
  debug('Attempt to logout');
  return token.expire(userData.token);
};
