'use strict';

/*@ngInject*/
function ResultTreeDirective($rootScope, RecursionHelper, ResultTree) {
  // Because there is a recursive directive usage,
  // I need to check if event listener alread has been set. Thus, I need a flag.
  var bounded = false;
  return {
    restrict: 'E',
    replace: true,
    scope: {
      tree: '='
    },
    templateUrl: __dirname + '/resultTree.html',
    controller: 'ResultTreeController',
    compile: function(elem) {
      return RecursionHelper.compile(elem, function(scope) {
        // Fix for nested directives
        if (!bounded) {
          bounded = true;

          elem.on('dragover', function(e) {
            e.preventDefault();
          });

          elem.on('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
            scope.$apply(function() {
              ResultTree.dropElement(scope.tree, e);
            });
          });
        }

      });
    }
  };
}

module.exports = ResultTreeDirective;
