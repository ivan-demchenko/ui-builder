'use strict';

var angular = require('angular');

module.exports = angular.module('uiBuilderApp.tabs', [])
  .directive('uibTabs', require('./tabs/tabs.directive'))
  .directive('uibTab', require('./tab/tab.directive'));
