'use strict';

angular.module('uiBuilderApp')
  .directive('itemPropertiesView', function ($rootScope, domElem) {
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
          $rootScope.$emit('uib:elem:edit:done', ctrl.elem);
          ctrl.elem = null;
        };

        ctrl.remove = function () {
          $rootScope.$emit('uib:elem:remove', ctrl.elem);
          ctrl.elem = null;
        };

        $rootScope.$on('uib:elem:edit', function (evt, elem) {
          ctrl.elem = elem;
          domElem.updateProps(ctrl.elem);
        });
      },
      controllerAs: 'propCtrl'
    };
  });
