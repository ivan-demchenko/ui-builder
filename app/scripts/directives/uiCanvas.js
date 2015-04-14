'use strict';

angular.module('uiBuilderApp')
  .directive('uiCanvas', function(ElemManager, canvas) {
    return {
      restrict: 'E',
      replace: true,
      template: '<iframe width="100%" height="100%"></iframe>',
      link: function(scope, elem) {

        canvas.register(elem[0]);

        var canvasBodyElem = canvas.getIframeBody(elem[0]);

        canvas.addStyles('/styles/uib-canvas.css');

        if (canvasBodyElem) {

          canvasBodyElem.addEventListener('drop', function(evt) {
            evt.preventDefault();
            ElemManager.dropElement(evt.target, evt.dataTransfer.getData('elementDescription'));
          });

          canvasBodyElem.addEventListener('dragend', function(evt) {
            evt.preventDefault();
            ElemManager.unmarkTarget(evt.target);
          });

          canvasBodyElem.addEventListener('dragover', function(evt) {
            evt.preventDefault();
            ElemManager.markTarget(evt.target);
          });

          canvasBodyElem.addEventListener('dragleave', function(evt) {
            evt.preventDefault();
            ElemManager.unmarkTarget(evt.target);
          });

        }

      }
    };
  });
