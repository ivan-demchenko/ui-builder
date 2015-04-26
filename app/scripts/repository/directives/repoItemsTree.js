'use strict';

angular.module('uiBuilderApp.repository')
  .directive('uibRepoItemsTree', function(RecursionHelper) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        tree: '='
      },
      templateUrl: 'scripts/repository/directives/repoItemsTree.html',
      compile: function(element) {
        return RecursionHelper.compile(element);
      }
    };
  });
