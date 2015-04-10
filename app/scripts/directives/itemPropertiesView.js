'use strict';

angular.module('uiBuilderApp')
  .directive('itemPropertiesView', function ($rootScope, domElem, ElemManager) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        data: '='
      },
      templateUrl: 'scripts/directives/itemPropertiesView.html',
      controller: function () {
        var ctrl = this;

        ctrl.elem = null;

        ctrl.done = function () {
          ElemManager.doneEditingElem(ctrl.elem);
          ctrl.elem = null;
        };

        ctrl.remove = function () {
          ElemManager.removeElem(ctrl.elem);
          ctrl.elem = null;
        };

        $rootScope.$on('uib:elem:edit', function (evt, elem) {
          ctrl.elem = elem;
        });
      },
      controllerAs: 'propCtrl'
    };
  });
