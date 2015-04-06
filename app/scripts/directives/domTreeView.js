'use strict';

angular.module('uiBuilderApp')
  .directive('domTreeView', function (RecursionHelper, canvas, $rootScope, dropProcess, domTreeParser) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        tree: '='
      },
      templateUrl: 'scripts/directives/domTreeView.html',
      compile: function (elem, attrs) {
        var rootSelector = attrs.rootSelector;
        return RecursionHelper.compile(elem, function (scope) {

          $rootScope.$on('uib:elem:dropped', function () {
            scope.$apply(function () {
              if (rootSelector) {
                var rootElem = document.querySelector(rootSelector);
                if (rootElem.tagName === 'IFRAME') {
                  rootElem = canvas.getIframeBody(rootElem);
                }
                scope.tree = domTreeParser.buildTree(rootElem);
              }
            });
          });

          $rootScope.$on('uib:elem:remove', function () {
            if (rootSelector) {
              var rootElem = document.querySelector(rootSelector);
              if (rootElem.tagName === 'IFRAME') {
                rootElem = canvas.getIframeBody(rootElem);
              }
              scope.tree = domTreeParser.buildTree(rootElem);
            }
          });

          elem.on('dblclick', function (evt) {
            evt.preventDefault();
            var elem = angular.element(evt.target).scope().node.domElem;
            dropProcess.startEditElem(elem);
          });

          elem.on('dragover', function (evt) {
            evt.preventDefault();
            dropProcess.markTarget(evt.target);
          });

          elem.on('dragend', function (evt) {
            evt.preventDefault();
            dropProcess.unmarkTarget(evt.target);
          });

          elem.on('dragleave', function (evt) {
            evt.preventDefault();
            dropProcess.unmarkTarget(evt.target);
          });

          elem.on('drop', function (evt) {
            evt.preventDefault();
            var elem;
            var angularTarget = angular.element(evt.target);
            if (angularTarget.scope().node) {
              elem = angularTarget.scope().node.domElem;
              if (elem) {
                dropProcess.dropElement(elem, evt.dataTransfer.getData('elemModel'));
              }
            }
          });

        });
      }
    };
  });
