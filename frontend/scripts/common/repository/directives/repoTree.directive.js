'use strict';

/*@ngInject*/
function RepositoryTreeDirective(RecursionHelper) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      tree: '='
    },
    templateUrl: 'scripts/common/repository/directives/repoTree.html',
    compile: function(element) {
      return RecursionHelper.compile(element);
    }
  };
}

module.exports = RepositoryTreeDirective;
