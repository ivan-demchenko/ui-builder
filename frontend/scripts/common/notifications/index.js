'use strict';

var angular = require('angular');

module.exports = angular.module('uiBuilderApp.notifications', [])
  .service('Notifications', require('./services/notifications.service'))
  .filter('notificationSeverity', require('./filters/notificationsSeverity.filter'))
  .controller('notificationsController', require('./directives/notifications.controller'))
  .directive('uibNotifications', require('./directives/notifications.directive'))
  .directive('uibNotification', require('./directives/notification.directive'));
