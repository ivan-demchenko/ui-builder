'use strict';

angular.module('uiBuilderApp.domTree')
  .directive('domTreeView', function($rootScope, ElemManager, DomTreeParser, DragDropHandler) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        tree: '='
      },
      templateUrl: 'scripts/domTree/directives/domTreeView.html',
      link: function(scope, elem) {
        DragDropHandler.bindEventHandlers(elem[0]);

        // FIXME: Recursive event binding
        $rootScope.$on('uib:canvas:updated', function(evt, root) {
          evt.stopPropagation();
          scope.$apply(function() {
            scope.tree = DomTreeParser.buildTree(root);
          });
        });

        scope.editElem = function(node) {
          ElemManager.startEditElem(node.domElem);
        };

        scope.removeElem = function(node) {
          ElemManager.removeElem(node.domElem);
        };
      }
    };
  });
