'use strict';

var angular = require('angular');

module.exports = angular.module('uiBuilderApp.propertyEditor', [])
  .directive('uibItemPropertiesEdit', require('./directives/itemPropertiesEdit.directive'));
