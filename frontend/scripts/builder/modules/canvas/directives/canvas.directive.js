'use strict';

/*@ngInject*/
function CanvasDirective($rootScope, Session) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      size: '='
    },
    templateUrl: __dirname + '/uiCanvas.html',
    link: function(scope, elem) {
      var iframe = elem[0].querySelector('iframe');
      iframe.src = Session.getResultingURL();

      scope.$watch('size', function(newVal, oldVal) {
        if (newVal !== oldVal) {
          iframe.width = newVal.width;
          iframe.height = newVal.height;
          iframe.contentWindow.location.reload();
        }
      });

    }
  };
}

module.exports = CanvasDirective;
