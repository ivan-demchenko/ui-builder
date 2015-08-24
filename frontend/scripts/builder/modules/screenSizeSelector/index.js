'use strict';

var angular = require('angular');

module.exports = angular.module('uiBuilderApp.screenSizeSelector', [])
  .controller('screenSizeSelectorController', require('./controllers/screenSizeSelector.controller'))
  .directive('uibScreenSizeSelector', require('./directives/screenSizeSelector.directive'));
