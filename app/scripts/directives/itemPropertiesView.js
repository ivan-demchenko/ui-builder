'use strict';

angular.module('uiBuilderApp')
  .directive('itemPropertiesView', function ($rootScope) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        data: '='
      },
      templateUrl: 'scripts/directives/itemPropertiesView.html',
      controller: function ($scope) {
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
          $scope.$apply(function () {
            ctrl.elem = elem;
          });
        });
      },
      controllerAs: 'propCtrl'
    };
  });
