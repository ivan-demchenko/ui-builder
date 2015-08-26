'use strict';

var angular = require('angular');

module.exports = angular.module('uiBuilderApp.propertyEditor', [])
  .directive('uibItemPropertiesEdit', require('./directives/itemPropertiesEdit.directive'))
  .controller('ItemPropertiesEditController', require('./controllers/itemPropertiesEdit.controller'));
