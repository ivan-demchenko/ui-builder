'use strict';

angular.module('uiBuilderApp')
  .directive('repoItem', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        model: '='
      },
      templateUrl: 'scripts/directives/repoItem.html',
      link: function(scope, elem) {
        elem.on('dragstart', function(evt) {
          if (!scope.model.markup) {
            evt.preventDefault();
            return;
          }
          evt.dataTransfer.setData('elemModel', JSON.stringify(scope.model));
          elem[0].classList.add('in-drag');
        });
        elem.on('dragend', function() {
          elem[0].classList.remove('in-drag');
        });
      }
    };
  });
