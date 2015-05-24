'use strict';

function shiftItems(arr, position) {
    var partOne = arr.slice(0, position);
    var partTwo = arr.slice(position);

    var partOneLastEl = partOne.splice(position - 1, 1);
    var partTwoFstEl = partTwo.splice(0, 1);
    return partOne.concat(partTwoFstEl).concat(partOneLastEl.concat(partTwo));
}

/*ngInject*/
function ResultTreeCtrl($scope) {
  $scope.canMoveUp = function(elem) {
    if ($scope.tree.length === 1 || $scope.tree.indexOf(elem) === 0) {
      return false;
    }
    return true;
  };

  $scope.canMoveDown = function(elem) {
    if ($scope.tree.length === 1 || $scope.tree.indexOf(elem) === $scope.tree.length - 1) {
      return false;
    }
    return true;
  };

  $scope.moveUp = function(elem) {
    var position = $scope.tree.indexOf(elem);
    $scope.tree = shiftItems($scope.tree, position);
  };

  $scope.moveDown = function(elem) {
    var position = $scope.tree.indexOf(elem) + 1;
    $scope.tree = shiftItems($scope.tree, position);
  };
}

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
    controller: ResultTreeCtrl,
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
