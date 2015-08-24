'use strict';

function Message(message, severity, data) {
  this.message = message;
  this.severity = severity;
  this.data = data;
}

module.exports.error = function(errorObj) {
  var errorMsg = errorObj ? errorObj.message : 'Oops, something went wrong...';
  return new Message(errorMsg, 'error', errorObj);
};

module.exports.success = function(message, data) {
  return new Message(message, 'success', data);
};
