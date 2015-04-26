'use strict';

var angular = require('angular');

module.exports = angular.module('uiBuilderApp.common', [])
  .controller('MainCtrl', require('./controllers/main'))
  .directive('uibAction', require('./directives/action'))
  .service('Common', require('./services/common'))
  .service('DomElem', require('./services/domElem'))
  .service('DragDropHandler', require('./services/dragDropHandler'))
  .service('ElemManager', require('./services/elemManager'))
  .factory('RecursionHelper', require('./services/recursionHelper'));
