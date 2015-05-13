'use strict';

var User = require('../models/user'),
    debug = require('debug')('server:domain:auth'),
    token = require('../token');

function findUser(username, done) {
  debug('Attempt to find a user by username %s ', username);

  User.findOne({ username: username }, '_id', function (err, userId) {
    if (err) {
      debug('Error while looking for a user: %s', err);
      return done(err);
    }

    debug('User has been found: %s', userId);

    done(null, userId);
  });
}

module.exports.registerUser = function(username, password, done) {
  debug('Attempt to register a new user: %s', username);

  findUser(username, function(existingUserId) {
    if (existingUserId) {
      debug('User already exists, id: %s', existingUserId);
      return done(new Error('User already exists.'));
    }

    debug('User `%s` does not exists. Add a new one', username);

    var newUser = new User({
      username: username,
      password: password
    });
    newUser.save(function(err) {
      if (err) {
        debug('Failed to save a user rec in DB');
        return done(err);
      }

      debug('A new user record has been saved in DB');

      return done(null, newUser);
    });
  });
};

module.exports.logUserIn = function(username, password, done) {

  debug('Try to log user in');

  findUser(username, function(err, user) {
    if (!user) {
      return done(new Error('User has not been not found'));
    }

    debug('User has been found, compare passwords');

    user.comparePassword(password, function(isMatch) {
      if (!isMatch) {
        debug('Attempt failed to login with %s', user.username);
        return done(new Error('Password is incorrect'));
      }

      debug('Password is good');

      token.create(user, function(err, userData) {
        if (err) {
          return done(err);
        }

        debug('New User record has been saved');

        return done(null, userData);
      });
    });
  });
};

module.exports.logUserOut = function(headers, done) {
  token.expireToken(headers);
  done(null, true);
};
