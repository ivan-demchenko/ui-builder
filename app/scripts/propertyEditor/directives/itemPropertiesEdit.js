'use strict';

angular.module('uiBuilderApp.propertyEditor')
  .directive('itemPropertiesEdit', function($rootScope, DomElem, ElemManager) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        data: '='
      },
      templateUrl: 'scripts/propertyEditor/directives/itemPropertiesEdit.html',
      controller: function($scope) {
        $scope.elem = null;

        $scope.done = function() {
          if ($scope.propsEditForm.$dirty) {
            ElemManager.doneEditingElem($scope.elem);
          }
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
          return 'scripts/propertyEditor/directives/subViews/' + param.type + '.html';
        };

        $rootScope.$on('uib:elem:edit:begin', function(evt, elem) {
          $scope.propsEditForm.$setPristine();
          $scope.elemIdentifier = DomElem.getElementIdentifier(elem);
          $scope.elem = elem;
        });

        $rootScope.$on('uib:elem:remove', function() {
          $scope.elem = null;
        });
      }
    };
  });
