'use strict';

angular.module('uiBuilderApp')
  .directive('repoItem', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        model: '='
      },
      template: '<div class="repo-item" draggable="true">{{model.name}}</div>',
      link: function (scope, elem) {
        elem.on('dragstart', function (evt) {
          evt.dataTransfer.setData('markup', scope.model.markup);
          elem[0].classList.add('in-drag');
        });
        elem.on('dragend', function (evt) {
          elem[0].classList.remove('in-drag');
        })
      }
    };
  });
