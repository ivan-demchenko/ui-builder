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

        function canHaveChildren(tagName) {
          var e = null,
            res = false;
          try {
            e = document.createElement(tagName);
            res = e.outerHTML.indexOf('/') > 0;
          } catch (e) {
            res = false;
          } finally {
            e = null;
          }
          return res;
        }

        function isParent(elem) {
          return elem.children.length > 0;
        }

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
            ctrl.elem.uibParams = ctrl.elem.uibParams || [];
            ctrl.canRemove = !!elem.uibRemovable;
            if (canHaveChildren(ctrl.elem.tagName) && !isParent(ctrl.elem)) {
              ctrl.elem.uibParams.push({
                name: 'Inner text',
                domAttr: 'innerText',
                value: elem.innerText
              });
            }
          });
        });
      },
      controllerAs: 'propCtrl'
    };
  });
