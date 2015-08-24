'use strict';

var notification = require('../models/notification.model');

/*@ngInject*/
function NotificationsService() {
  var callbacks = [];

  this.register = function(callback) {
    if (callbacks.indexOf(callback) === -1) {
      callbacks.push(callback);
    }
  };

  this.notify = function(severity, msg) {
    var notif = new notification(severity, msg);
    callbacks.forEach(function(cb) {
      cb.call(this, notif);
    });
  };
}

module.exports = NotificationsService;
