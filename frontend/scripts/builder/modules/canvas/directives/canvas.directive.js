'use strict';

/*@ngInject*/
function CanvasDirective($rootScope, Canvas) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: __dirname + '/uiCanvas.html',
    controller: function() {
      $rootScope.$on('uib:element:dropped', function() {
        Canvas.saveSnapshot();
      });

      $rootScope.$on('uib:elem:remove', function(evt, elementToBeRemoved) {
        Canvas.removeElement(elementToBeRemoved);
      });

      $rootScope.$on('uib:elem:edit:done', function() {
        Canvas.saveSnapshot();
      });
    },
    link: function(scope, elem) {
      Canvas.register(elem);
    }
  };
}

module.exports = CanvasDirective;
