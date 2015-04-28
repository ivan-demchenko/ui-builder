'use strict';

var angular = require('angular');

module.exports = angular.module('uiBuilderApp.repository', [])
  .directive('uibRepoItem', require('./directives/repoItem.directive'))
  .directive('uibRepoItemsTree', require('./directives/repoTree.directive'))
  .filter('repoItemClassifier', require('./filters/repoItemClassifier.filter'))
  .service('Repository', require('./services/repository.service'));
