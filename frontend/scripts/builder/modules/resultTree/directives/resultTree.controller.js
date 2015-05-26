'use strict';

/*ngInject*/
function ResultTreeCtrl($scope, ResultTree) {
  $scope.canMoveUp = function(elem) {
    return $scope.tree.length > 1 && $scope.tree.indexOf(elem) > 0;
  };

  $scope.canMoveDown = function(elem) {
    return $scope.tree.length > 1 && $scope.tree.indexOf(elem) < ($scope.tree.length - 1);
  };

  $scope.moveUp = function(elem) {
    $scope.tree = ResultTree.moveElementUp(elem, $scope.tree);
  };

  $scope.moveDown = function(elem) {
    $scope.tree = ResultTree.moveElementDown(elem, $scope.tree);
  };

  $scope.removeElem = function(elem) {
    ResultTree.removeElem($scope.tree, elem);
  };
}

module.exports = ResultTreeCtrl;
