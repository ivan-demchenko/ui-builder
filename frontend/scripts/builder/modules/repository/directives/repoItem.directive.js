'use strict';

var angular = require('angular');

/*@ngInject*/
function RepositoryItemDirective($compile) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      model: '='
    },
    templateUrl: __dirname + '/repoItem.html',
    link: function(scope, elem) {
      if (Array.isArray(scope.model.subNodes) && scope.model.subNodes.length) {
        $compile('<uib-repo-items-tree tree="model"></uib-repo-items-tree>')(scope, function(cloned) {
          elem.append(cloned);
        });
      } else if (scope.model.tagName) {
        elem.on('dragstart', function(evt) {
          var copy = angular.copy(scope.model);
          evt.dataTransfer.setData('elementDescription', JSON.stringify(copy));
          elem.addClass('drag-from');
        });

        elem.on('dragend', function() {
          elem.removeClass('drag-from');
        });
      }
    }
  };
}

module.exports = RepositoryItemDirective;
