'use strict';

/*@ngInject*/
function RepositoryTreeDirective(RecursionHelper) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      tree: '='
    },
    templateUrl: __dirname + '/repoTree.html',
    compile: function(element) {
      return RecursionHelper.compile(element);
    }
  };
}

module.exports = RepositoryTreeDirective;
