'use strict';

angular.module('uiBuilderApp')
  .directive('domTreeView', function (RecursionHelper, $rootScope, dropProcess, domTreeParser) {
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
                scope.tree = domTreeParser.buildTree(document.querySelector(rootSelector));
              }
            });
          });

          $rootScope.$on('uib:elem:remove', function () {
            if (rootSelector) {
              scope.tree = domTreeParser.buildTree(document.querySelector(rootSelector));
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
            var elem = angular.element(evt.target).scope().node.domElem;
            dropProcess.dropElement(elem, evt.dataTransfer.getData('elemModel'));
          });

        });
      }
    };
  });
