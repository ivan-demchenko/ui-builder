'use strict';

/*@ngInject*/
function RepositoryTreeDirective() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      tree: '='
    },
    templateUrl: __dirname + '/repoTree.html'
  };
}

module.exports = RepositoryTreeDirective;
