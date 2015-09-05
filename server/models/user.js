'use strict';

var debug = require('debug')('uib:models:user');
var Q = require('q');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now }
});

userSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) { return next(); }

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) { return next(err); }
        user.password = hash;
        next();
    });
  });
});

userSchema.methods.comparePassword = function(password) {
  if (!password) {
    throw new Error('No password for comparison has been provided');
  }
  debug('Comparing passwords');
  return Q.ninvoke(bcrypt, 'compare', password, this.password);
};

module.exports = mongoose.model('User', userSchema);
