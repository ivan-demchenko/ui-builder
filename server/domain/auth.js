'use strict';

var Q = require('q'),
    R = require('ramda'),
    User = require('../models/user'),
    debug = require('debug')('uib:server:domain:auth'),
    token = require('../token');

function findUser(email) {
  debug('Attempt to find a user by email %s ', email);
  return Q.ninvoke(User, 'findOne', {email: email});
}

function addUser(email, password, cb) {
  debug('Adding a new user %s', email);

  var newUser = new User({
    email: email,
    password: password
  });

  newUser.save(cb);
}

module.exports.registerPayloadCorrect = function(req) {
  debug('Check register payload');

  var email = req.body.email ? req.body.email.trim() : '';
  var password = req.body.password ? req.body.password.trim() : '';
  var passwordConfirmation = req.body.passwordConfirmation ? req.body.passwordConfirmation.trim() : '';

  if (!email || !password || !passwordConfirmation) {
    throw new Error('Please fill out all the fields');
  }

  if (password !== passwordConfirmation) {
    throw new Error('Password and password confirmation do not match');
  }

  return [email, password];
};

module.exports.loginPayloadCorrect = function(req) {
  debug('Check login payload');

  var email = req.body.email ? req.body.email.trim() : '';
  var password = req.body.password ? req.body.password.trim() : '';

  if (!email || !password) {
    throw new Error('Please, enter email and password');
  }

  return [email, password];
};

module.exports.registerUser = function(email, password) {
  debug('Attempt to register a new user: %s', email);

  return findUser(email).then(function(user) {
    if (R.isNil(user)) {
      debug('No such user, will add a new one!');
      return Q.nfcall(addUser, email, password);
    }
    throw new Error('This user name is already taken, I am afraid');
  });
};

module.exports.logUserIn = function(email, password) {
  debug('Try to log user in');

  return findUser(email).then(function(user) {
    if (R.isNil(user)) {
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
