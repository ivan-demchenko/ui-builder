'use strict';

var message = require('./responseMessages'),
    _ = require('lodash');

function sendResponce(type, res) {
  return function(code) {
    return res.set('Content-Type', 'text/' + type).send(code);
  };
}

module.exports.error = _.curry(function(responceObject, data) {
  return responceObject
    .status(500)
    .json(message.error(data));
});

module.exports.success = _.curry(function(responceObject, successMessage, data) {
  return responceObject
    .status(200)
    .json(message.success(successMessage, data));
});

module.exports.invalidToken = function(responceObject) {
  return function() {
    return responceObject
      .status(401)
      .json(message.error(new Error('Invalid token')));
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
