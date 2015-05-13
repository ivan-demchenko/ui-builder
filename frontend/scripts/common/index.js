'use strict';

var angular = require('angular');

module.exports = angular.module('uiBuilderApp.common', [
    require('./canvas').name,
    require('./modal').name,
    require('./domTree').name,
    require('./propertyEditor').name,
    require('./repository').name,
    require('./htmlView').name
  ])
  .directive('uibAction', require('./directives/action/action.directive'))
  .service('Common', require('./services/common.service'))
  .service('DomElem', require('./services/domElem.service'))
  .service('ElemManager', require('./services/elemManager.service'))
  .factory('RecursionHelper', require('./services/recursionHelper.service'))
  .factory('AuthInterceptor', require('./services/authInterceptor.service'))
  .service('Storage', require('./services/storage.service'))
  .service('User', require('./services/user.service'));
