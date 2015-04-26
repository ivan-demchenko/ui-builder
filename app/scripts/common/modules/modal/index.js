'use strict';

var angular = require('angular'),
    directivesDefinitions = require('./directives/modal.directive');

module.exports = angular.module('uiBuilderApp.modal', [])
  .factory('Modal', require('./services/modal.service'))
  .directive('uibModal', directivesDefinitions.modal)
  .directive('uibModalHeader', directivesDefinitions.header)
  .directive('uibModalContent', directivesDefinitions.content);
