'use strict';

var Q = require('q'),
    User = require('../models/user'),
    debug = require('debug')('server:domain:auth'),
    token = require('../token');

function findUser(username) {
  debug('Attempt to find a user by username %s ', username);
  return Q.ninvoke(User, 'findOne', {username: username});
}

module.exports.registerUser = function(username, password) {
  debug('Attempt to register a new user: %s', username);

  return findUser(username).then(function(existingUserId) {
    if (existingUserId) {
      debug('User already exists, id: %s', existingUserId);
      throw new Error('User already exists.');
    }

    debug('User `%s` does not exists. Add a new one', username);

    var newUser = new User({
      username: username,
      password: password
    });

    return Q.nfcall(newUser.save);
  });
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
