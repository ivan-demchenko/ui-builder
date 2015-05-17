'use strict';

var angular = require('angular');

module.exports = angular.module('uiBuilderApp.domTree', [])
  .directive('uibDomTreeView', require('./directives/domTreeView.directive'))
  .directive('uibDomTreeItem', require('./directives/domTreeItem.directive'));
