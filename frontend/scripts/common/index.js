'use strict';

var angular = require('angular');

module.exports = angular.module('uiBuilderApp.common', [
    require('./modal').name,
    require('./tabs').name
  ])
  .directive('uibAction', require('./directives/action/action.directive'))
  .service('Behavior', require('./services/behavior.service'))
  .service('ResultTree', require('./services/resultTree.service'))
  .factory('AuthInterceptor', require('./services/authInterceptor.service'))
  .service('Storage', require('./services/storage.service'))
  .service('Session', require('./services/session.service'))
  .service('User', require('./services/user.service'));
