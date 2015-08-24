'use strict';

var angular = require('angular');

module.exports = angular.module('uiBuilderApp.workbench', [
  require('../canvas').name,
  require('../screenSizeSelector').name
])
  .controller('WorkbenchController', require('./controllers/workbench.controller'))
  .directive('uibWorkbench', require('./directives/workbench.directive'));
