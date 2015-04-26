'use strict';

module.exports = ['Canvas', 'ElemManager', '$rootScope',
function(Canvas, ElemManager, $rootScope) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'scripts/canvas/directives/uiCanvas.html',
    link: function(scope, elem) {
      Canvas.register(elem);

      $rootScope.$on('uib:element:dropped', function(evt, droppedElement, target) {
        Canvas.elementDropped(droppedElement, target);
      });

      $rootScope.$on('uib:elem:remove', function(evt, elementToBeRemoved) {
        Canvas.removeElement(elementToBeRemoved);
      });

      $rootScope.$on('uib:elem:edit:done', function() {
        Canvas.reloadIFrame();
      });
    }
  };
}];
