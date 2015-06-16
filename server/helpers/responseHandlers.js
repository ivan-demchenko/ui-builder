'use strict';

var message = require('./responseMessages');

module.exports.error = function(responceObject) {
  return function(reason) {
    return responceObject
      .status(500)
      .json(message.error(reason));
  };
};

module.exports.invalidToken = function(responceObject) {
  return function() {
    return responceObject
      .status(401)
      .json(message.error(new Error('Invalid token')));
  };
};

module.exports.success = function(responceObject, successMessage) {
  return function(data) {
    return responceObject
      .status(200)
      .json(message.success(successMessage, data));
  };
};

module.exports.sendHTML = function(res) {
  return function(code) {
    return res.set('Content-Type', 'text/html').send(code);
  };
};

module.exports.sendJS = function(res) {
  return function(code) {
    return res.set('Content-Type', 'text/javascript').send(code);
  };
};

module.exports.sendCSS = function(res) {
  return function(code) {
    return res.set('Content-Type', 'text/css').send(code);
  };
};
