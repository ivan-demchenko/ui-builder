'use strict';

var angular = require('angular');

module.exports = angular.module('uiBuilderApp.htmlView', [])
  .directive('uibHtmlView', require('./directives/htmlView.directive'));
