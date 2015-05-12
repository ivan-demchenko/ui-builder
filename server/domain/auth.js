'use strict';

var userDB = require('../models/user'),
    debug = require('debug')('server:domain:auth'),
    token = require('../token');

function findUser(username, done) {
  debug('Try to find a user by username %s ', username);

  userDB.userModel.findOne({username: username}, function (err, user) {
    if (err) {
      debug('Error while looking for a user: %s', err);
      return done(err);
    }
    debug('No error, result: %s', user);
    done(null, user);
  });
}

module.exports.registerUser = function(username, password, done) {
  findUser(username, function(existingUser) {
    if (existingUser) {
      debug('User with username %s already exists', username);
      return done('User with username ' + username + ' already exists.');
    }

    debug('User with username %s does not exists. Add a new one', username);

    var newUser = new userDB.userModel();
    newUser.username = username;
    newUser.password = password;

    newUser.save(function(err) {
      if (err) {
        return debug(err);
      }
      return done(null, newUser);
    });
  });
};

module.exports.logUserIn = function(username, password, done) {
  findUser(username, function(err, user) {
    if (!user) {
      return done('User has not been not found');
    }

    debug('User has been found, compare passwords');

    user.comparePassword(password, function(isMatch) {
      if (!isMatch) {
        debug('Attempt failed to login with %s', user.username);
        return done('Password is incorrect');
      }

      debug('Password is good');

      token.create(user, function(err, userData) {
        if (err) {
          return done(err);
        }
        return done(null, userData);
      });
    });
  });
};

module.exports.logUserOut = function(headers, done) {
  token.expireToken(headers);
  done(null, true);
};
