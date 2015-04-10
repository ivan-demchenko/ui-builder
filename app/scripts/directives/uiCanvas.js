'use strict';

angular.module('uiBuilderApp')
  .directive('uiCanvas', function (ElemManager, canvas) {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="uib-canvas-wrapp"><iframe width="100%" height="100%"></iframe></div>',
      link: function (scope, elem) {

        var iframe = elem[0].getElementsByTagName('iframe')[0];
        canvas.register(iframe);

        var canvasBodyElem = canvas.getIframeBody(iframe);

        canvas.addStyles('/styles/uib-canvas.css');

        if (canvasBodyElem) {

          canvasBodyElem.addEventListener('drop', function (evt) {
            evt.preventDefault();
            ElemManager.dropElement(evt.target, evt.dataTransfer.getData('elemModel'));
          });

          canvasBodyElem.addEventListener('dragend', function (evt) {
            evt.preventDefault();
            ElemManager.unmarkTarget(evt.target);
          });

          canvasBodyElem.addEventListener('dragover', function (evt) {
            evt.preventDefault();
            ElemManager.markTarget(evt.target);
          });

          canvasBodyElem.addEventListener('dragleave', function (evt) {
            evt.preventDefault();
            ElemManager.unmarkTarget(evt.target);
          });

        }

      }
    };
  });
