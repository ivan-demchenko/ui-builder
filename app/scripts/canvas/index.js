'use strict';

var angular = require('angular');

module.exports = angular.module('uiBuilderApp.canvas', [])
  .service('Canvas', require('./services/canvas.service'))
  .directive('uibCanvas', require('./directives/canvas.directive'));
