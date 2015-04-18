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
      controller: function() {
        var ctrl = this;

        ctrl.elem = null;

        ctrl.done = function() {
          ElemManager.doneEditingElem(ctrl.elem);
          ctrl.elem = null;
        };

        ctrl.remove = function() {
          ElemManager.removeElem(ctrl.elem);
          ctrl.elem = null;
        };

        $rootScope.$on('uib:elem:edit:begin', function(evt, elem) {
          ctrl.elem = elem;
        });

        $rootScope.$on('uib:elem:remove', function() {
          ctrl.elem = null;
        });
      },
      controllerAs: 'propCtrl'
    };
  });
