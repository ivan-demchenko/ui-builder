'use strict';

/*@ngInject*/
function CanvasDirective($rootScope, Session) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      size: '=',
      isRotated: '='
    },
    templateUrl: __dirname + '/uiCanvas.html',
    link: function(scope, elem) {
      var iframe = elem[0].querySelector('iframe');
      var holder = elem[0].querySelector('.uib-canvas__holder');
      iframe.src = Session.getResultingURL();

      scope.$watch('size', function(newVal, oldVal) {
        if (newVal !== oldVal) {
          holder.style.width = newVal.width;
          holder.style.height = newVal.height;
          iframe.contentWindow.location.reload();
        }
      });

      scope.$watch('isRotated', function(newVal, oldVal) {
        if (newVal !== oldVal) {
          var t = holder.style.width;
          holder.style.width = holder.style.height;
          holder.style.height = t;
          iframe.contentWindow.location.reload();
        }
      });

    }
  };
}

module.exports = CanvasDirective;
