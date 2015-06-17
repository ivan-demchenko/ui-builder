'use strict';

/*@ngInject*/
function ResultTreeItemDirective($compile, ResultTree) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      model: '=',
      canMoveUp: '&',
      canMoveDown: '&',
      moveUp: '&',
      moveDown: '&',
      edit: '&',
      remove: '&'
    },
    templateUrl: __dirname + '/resultTreeItem.html',
    controller: 'ResultTreeItemController',
    link: function(scope, elem) {
      if (Array.isArray(scope.model.children) && scope.model.children.length) {
        $compile('<uib-result-tree tree="model.children"></uib-result-tree>')(scope, function(cloned) {
          elem.append(cloned);
        });
      }

      scope.$watch(function() {
        return !!scope.model.children && scope.model.children.length > 0;
      }, function(newVal) {
        if (newVal) {
          $compile('<uib-result-tree tree="model.children"></uib-result-tree>')(scope, function(cloned) {
            elem.append(cloned);
          });
        }
      });

      elem[0].addEventListener('dragover', function(e) {
        e.preventDefault();
        return false;
      });

      elem[0].addEventListener('drop', function(e) {
        if (e.stopPropagation) {
          e.stopPropagation();
        }
        ResultTree.dropElement(scope.model, e);
        return false;
      });
    }
  };
}

module.exports = ResultTreeItemDirective;
