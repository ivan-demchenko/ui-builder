'use strict';

function Message(message, severity, data) {
  this.severity = severity;
  this.message = message;
  this.data = data;
}

module.exports.error = function(message, data) {
  return new Message(message, 'error', data);
};

module.exports.success = function(message, data) {
  return new Message(message, 'success', data);
};
