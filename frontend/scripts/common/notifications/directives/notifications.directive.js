'use strict';

/*@ngInject*/
function NotificationsDirective() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: __dirname + '/notifications.html',
    controller: 'notificationsController',
    controllerAs: 'notifCtrl'
  };
}

module.exports = NotificationsDirective;
