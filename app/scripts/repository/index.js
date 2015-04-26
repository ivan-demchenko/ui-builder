'use strict';

var angular = require('angular');

module.exports = angular.module('uiBuilderApp.repository', [])
  .directive('uibRepoItem', require('./directives/repoItem'))
  .directive('uibRepoItemsTree', require('./directives/repoItemsTree'))
  .filter('repoItemClassifier', require('./filters/repoItemClassifier'))
  .service('Repository', require('./services/repository'));
