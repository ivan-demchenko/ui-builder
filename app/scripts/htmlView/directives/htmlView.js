'use strict';

module.exports = ['Canvas',
function(Canvas) {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'scripts/htmlView/directives/htmlView.html',
    controller: function($scope) {
      $scope.getSource = function() {
        return Canvas.getSourceCode();
      };
    }
  };
}];
