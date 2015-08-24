'use strict';

/*@ngInject*/
function NotificationsController($scope, Notifications) {
  this.notifications = [];

  this.removeNotification = function(notification) {
    $scope.$apply(function() {
      var index = this.notifications.indexOf(notification);
      this.notifications.splice(index, 1);
    }.bind(this));
  };

  this.showNotification = function(notification) {
    this.notifications.push(notification);
  };

  Notifications.register(this.showNotification.bind(this));
}

module.exports = NotificationsController;
