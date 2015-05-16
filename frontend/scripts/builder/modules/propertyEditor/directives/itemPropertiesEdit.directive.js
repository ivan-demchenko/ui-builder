'use strict';

/*@ngInject*/
function ItemPropertiesEditDirective($rootScope, DomElem, ResultTree) {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    templateUrl: __dirname + '/itemPropertiesEdit.html',
    controller: function($scope) {
      $scope.elem = null;

      $scope.done = function() {
        // if ($scope.propsEditForm.$dirty) {
          ResultTree.doneEditingElem($scope.elem);
        // }
        $scope.close();
      };

      $scope.close = function() {
        $scope.elem = null;
      };

      $scope.remove = function() {
        ResultTree.removeElem($scope.elem);
        $scope.elem = null;
      };

      $scope.getParamTemplateUrl = function(param) {
        return __dirname + '/subViews/' + param.type + '.html';
      };

      $rootScope.$on('uib:elem:edit:begin', function(evt, elem) {
        // $scope.propsEditForm.$setPristine();
        $scope.elemIdentifier = DomElem.getElementIdentifier(elem);
        $scope.elem = elem;
      });

      $rootScope.$on('uib:elem:remove', function() {
        $scope.elem = null;
      });
    }
  };
}

module.exports = ItemPropertiesEditDirective;
