'use strict';

angular.module('uiBuilderApp')
  .directive('uiCanvas', function (dropProcess, iframeContent, $rootScope) {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="uib-canvas-wrapp"><iframe width="100%" height="100%"></iframe></div>',
      link: function (scope, elem) {

        var iframe = elem[0].getElementsByTagName('iframe')[0],
          canvasBodyElem = iframeContent.getIframeBody(iframe);

        if (canvasBodyElem) {

          $rootScope.$on('uib:elem:edit:done', function (evt, elem) {
            dropProcess.resetAttrsForElement(elem);
          });

          $rootScope.$on('uib:elem:remove', function (evt, elem) {
            dropProcess.removeElem(elem);
          });

          canvasBodyElem.addEventListener('dblclick', function (evt) {
            evt.preventDefault();
            dropProcess.startEditElem(evt.target);
          });

          canvasBodyElem.addEventListener('drop', function (evt) {
            evt.preventDefault();
            dropProcess.dropElement(evt.target, evt.dataTransfer.getData('elemModel'));
          });

          canvasBodyElem.addEventListener('dragend', function (evt) {
            evt.preventDefault();
            dropProcess.unmarkTarget(evt.target);
          });

          canvasBodyElem.addEventListener('dragover', function (evt) {
            evt.preventDefault();
            dropProcess.markTarget(evt.target);
          });

          canvasBodyElem.addEventListener('dragleave', function (evt) {
            evt.preventDefault();
            dropProcess.unmarkTarget(evt.target);
          });

        }

      }
    };
  });
