'use strict';

var angular = require('angular');

module.exports = angular.module('uiBuilderApp.resultTree', [])
  .controller('ResultTreeController', require('./directives/resultTree.controller'))
  .directive('uibResultTree', require('./directives/resultTree.directive'))
  .directive('uibResultTreeItem', require('./directives/resultTreeItem.directive'));
