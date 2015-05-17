'use strict';

/*@ngInject*/
function CanvasDirective($rootScope, Session) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: __dirname + '/uiCanvas.html',
    link: function(scope, elem) {
      var iframe = elem[0].querySelector('iframe');
      iframe.src = Session.getResultingURL();
    }
  };
}

module.exports = CanvasDirective;
