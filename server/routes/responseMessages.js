'use strict';

function Message(message, severity, data) {
  this.severity = severity;
  this.message = message;
  this.data = data;
}

module.exports.error = function(errorObj) {
  return new Message(errorObj ? errorObj.message : 'Error', 'error', errorObj);
};

module.exports.success = function(message, data) {
  return new Message(message, 'success', data);
};
