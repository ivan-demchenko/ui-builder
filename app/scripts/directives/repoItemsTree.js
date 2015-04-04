'use strict';

angular.module('uiBuilderApp')
  .directive('repoItemsTree', function (RecursionHelper) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        tree: '='
      },
      templateUrl: 'scripts/directives/repoItemsTree.html',
      compile: function (element) {
        return RecursionHelper.compile(element);
      }
    };
  });
