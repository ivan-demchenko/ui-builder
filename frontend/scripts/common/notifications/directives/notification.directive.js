'use strict';

/*@ngInject*/
function NotificationDirective($timeout) {
  return {
    restrict: 'E',
    replace: true,
    require: '^uibNotifications',
    scope: {
      notificationData: '='
    },
    templateUrl: __dirname + '/notification.html',
    link: function(scope, _, __, notifCtrl) {
      $timeout(function() {
        notifCtrl.removeNotification(scope.notificationData);
      }, 2000);
    }
  };
}

module.exports = NotificationDirective;
