'use strict';

var angular = require('angular');

module.exports = angular
  .module('uiBuilderApp.domTree', [])
  .directive('uibDomTreeView', require('./directives/domTreeView'))
  .service('DomTreeParser', require('./services/domTreeParser'));
