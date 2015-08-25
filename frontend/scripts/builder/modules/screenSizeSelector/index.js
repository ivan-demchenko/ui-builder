'use strict';

var angular = require('angular');

module.exports = angular.module('uiBuilderApp.screenSizeSelector', [])
  .directive('uibScreenSizeSelector', require('./directives/screenSizeSelector.directive'));
