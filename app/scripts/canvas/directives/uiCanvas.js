'use strict';

angular.module('uiBuilderApp.canvas')
  .directive('uiCanvas', function(canvas) {
    return {
      restrict: 'E',
      replace: true,
      template: '<iframe width="100%" height="100%"></iframe>',
      link: function(scope, elem) {
        canvas.register(elem[0]);
      }
    };
  });
