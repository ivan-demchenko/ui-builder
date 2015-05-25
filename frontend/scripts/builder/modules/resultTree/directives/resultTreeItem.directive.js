'use strict';

/*ngInject*/
function ResultTreeItemCtrl($scope, ResultTree) {
  $scope.isEditable = function() {
    return typeof $scope.model.parameters !== 'undefined';
  };

  $scope.editElem = function() {
    ResultTree.startEditElem($scope.model);
  };

  $scope.removeElem = function() {
    ResultTree.removeElem($scope.model);
  };

  $scope.canMove = function(direction) {
    if (direction === 'up') {
      return $scope.canMoveUp();
    }
    if (direction === 'down') {
      return $scope.canMoveDown();
    }
  };
}

/*@ngInject*/
function ResultTreeItemDirective(ResultTree) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      model: '=',
      canMoveUp: '&',
      canMoveDown: '&',
      moveUp: '&',
      moveDown: '&'
    },
    templateUrl: __dirname + '/resultTreeItem.html',
    controller: ResultTreeItemCtrl,
    link: function(scope, elem) {
      elem[0].addEventListener('dragover', function(e) {
        e.preventDefault();
      });

      elem[0].addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (scope.model.children) {
          scope.$apply(function() {
            ResultTree.dropElement(scope.model.children, e);
          });
        }
      });
    }
  };
}

module.exports = ResultTreeItemDirective;
