'use strict';

/*@ngInject*/
function ResultTreeDirective($rootScope, ResultTree) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      tree: '='
    },
    templateUrl: __dirname + '/resultTree.html',
    controller: 'ResultTreeController',
    link: function(scope, elem) {
      elem[0].addEventListener('dragover', function(e) {
        e.preventDefault();
        return false;
      });

      elem[0].addEventListener('drop', function(e) {
        e.stopPropagation();
        if (scope.tree) {
          ResultTree.dropElement(scope.tree, e);
          $rootScope.$digest();
        }
        return false;
      });
    }
  };
}

module.exports = ResultTreeDirective;
