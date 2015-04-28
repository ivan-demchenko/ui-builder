'use strict';

var angular = require('angular');

module.exports = angular.module('uiBuilderApp.common', [])
  .controller('MainCtrl', require('./controllers/main.controller'))
  .directive('uibAction', require('./directives/action.directive'))
  .service('Common', require('./services/common.service'))
  .service('DomElem', require('./services/domElem.service'))
  .service('DragDropHandler', require('./services/dragDropHandler.service'))
  .service('ElemManager', require('./services/elemManager.service'))
  .factory('RecursionHelper', require('./services/recursionHelper.service'));
