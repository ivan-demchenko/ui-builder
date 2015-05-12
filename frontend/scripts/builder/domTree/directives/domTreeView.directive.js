'use strict';

/*@ngInject*/
function DomTreeViewDirective($rootScope, RecursionHelper, ElemManager, DomTreeParser) {
  // Because there is a recursive directive usage,
  // I need to check if event listener alread has been set. Thus, I need a flag.
  var bounded = false;
  return {
    restrict: 'E',
    replace: true,
    scope: {
      tree: '='
    },
    templateUrl: 'scripts/builder/domTree/directives/domTreeView.html',
    compile: function(elem) {
      return RecursionHelper.compile(elem, function(scope) {
        // Fix for nested directives
        if (!bounded) {
          bounded = true;
          $rootScope.$on('uib:canvas:updated', function(evt, root) {
            evt.stopPropagation();
            scope.$apply(function() {
              scope.tree = DomTreeParser.buildTree(root);
            });
          });
        }

      });
    }
  };
}

module.exports = DomTreeViewDirective;
