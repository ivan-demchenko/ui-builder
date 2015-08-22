'use strict';

var message = require('./responseMessages');

function sendResponce(type, res) {
  return function(code) {
    return res.set('Content-Type', 'text/' + type).send(code);
  };
}

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
  return sendResponce('html', res);
};

module.exports.sendJS = function(res) {
  return sendResponce('javascript', res);
};

module.exports.sendCSS = function(res) {
  return sendResponce('css', res);
};
