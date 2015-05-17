'use strict';

var angular = require('angular');

module.exports = angular.module('uiBuilderApp.canvas', [])
  .directive('uibCanvas', require('./directives/canvas.directive'));
