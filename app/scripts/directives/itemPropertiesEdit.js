'use strict';

angular.module('uiBuilderApp')
  .directive('itemPropertiesEdit', function($rootScope, domElem, ElemManager) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        data: '='
      },
      templateUrl: 'scripts/directives/itemPropertiesEdit.html',
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

        $rootScope.$on('uib:elem:edit', function(evt, elem) {
          ctrl.elem = elem;
        });

        $rootScope.$on('uib:elem:remove', function() {
          ctrl.elem = null;
        });
      },
      controllerAs: 'propCtrl'
    };
  });
