'use strict';

var angular = require('angular');

module.exports = angular.module('uiBuilderApp.workbench', [
  require('../canvas').name,
  require('../screenSizeSelector').name
])
  .service('WorkbenchSrvs', require('./services/workbench.service'))
  .directive('uibWorkbench', require('./directives/workbench.directive'));
