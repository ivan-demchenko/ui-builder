'use strict';

/*@ngInject*/
function ItemPropertiesEditDirective($rootScope, DomElem, ElemManager) {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    templateUrl: 'scripts/builder/propertyEditor/directives/itemPropertiesEdit.html',
    controller: function($scope) {
      $scope.elem = null;

      $scope.done = function() {
        // if ($scope.propsEditForm.$dirty) {
          ElemManager.doneEditingElem($scope.elem);
        // }
        $scope.close();
      };

      $scope.close = function() {
        $scope.elem = null;
      };

      $scope.remove = function() {
        ElemManager.removeElem($scope.elem);
        $scope.elem = null;
      };

      $scope.getParamTemplateUrl = function(param) {
        return 'scripts/builder/propertyEditor/directives/subViews/' + param.type + '.html';
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
