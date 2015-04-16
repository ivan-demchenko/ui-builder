'use strict';

angular.module('uiBuilderApp.domTree')
  .directive('domTreeView', function(RecursionHelper, canvas, $rootScope, ElemManager, DomTreeParser) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        tree: '='
      },
      templateUrl: 'scripts/domTree/directives/domTreeView.html',
      compile: function(elem, attrs) {
        var rootSelector = attrs.rootSelector;
        return RecursionHelper.compile(elem, function(scope) {

          $rootScope.$on('uib:elem:dropped', function() {
            scope.$apply(function() {
              if (rootSelector) {
                var rootElem = document.querySelector(rootSelector);
                if (rootElem.tagName === 'IFRAME') {
                  rootElem = canvas.getIframeBody(rootElem);
                }
                scope.tree = DomTreeParser.buildTree(rootElem);
              }
            });
          });

          $rootScope.$on('uib:elem:edit:done', function() {
            if (rootSelector) {
              var rootElem = document.querySelector(rootSelector);
              if (rootElem.tagName === 'IFRAME') {
                rootElem = canvas.getIframeBody(rootElem);
              }
              scope.tree = DomTreeParser.buildTree(rootElem);
            }
          });

          $rootScope.$on('uib:elem:remove', function() {
            if (rootSelector) {
              var rootElem = document.querySelector(rootSelector);
              if (rootElem.tagName === 'IFRAME') {
                rootElem = canvas.getIframeBody(rootElem);
              }
              scope.tree = DomTreeParser.buildTree(rootElem);
            }
          });

          elem.on('dragover', function(evt) {
            evt.preventDefault();
            ElemManager.markTarget(evt.target);
          });

          elem.on('dragend', function(evt) {
            evt.preventDefault();
            ElemManager.unmarkTarget(evt.target);
          });

          elem.on('dragleave', function(evt) {
            evt.preventDefault();
            ElemManager.unmarkTarget(evt.target);
          });

          elem.on('drop', function(evt) {
            evt.preventDefault();
            var elem;
            var angularTarget = angular.element(evt.target);
            if (angularTarget.scope().node) {
              elem = angularTarget.scope().node.domElem;
              if (elem) {
                ElemManager.dropElement(elem, evt.dataTransfer.getData('elementDescription'));
              }
            }
          });

          scope.editElem = function(node) {
            ElemManager.startEditElem(node.domElem);
          };

          scope.removeElem = function(node) {
            ElemManager.removeElem(node.domElem);
          };

        });
      }
    };
  });
