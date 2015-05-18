'use strict';

var angular = require('angular');

module.exports = angular.module('uiBuilderApp.resultTree', [])
  .directive('uibResultTree', require('./directives/resultTree.directive'))
  .directive('uibResultTreeItem', require('./directives/resultTreeItem.directive'));
