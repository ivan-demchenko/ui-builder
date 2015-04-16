'use strict';

angular.module('uiBuilderApp.repository')
  .directive('repoItemsTree', function(RecursionHelper) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        tree: '='
      },
      templateUrl: 'scripts/repository/directives/repoItemsTree.html',
      compile: function(element) {
        return RecursionHelper.compile(element, function(scope) {
          scope.toggleSubTree = function() {
            scope.opened = !scope.opened;
          };
        });
      }
    };
  });
