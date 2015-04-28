'use strict';

/*@ngInject*/
function DomTreeItemDirective(ElemManager) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      model: '='
    },
    templateUrl: 'scripts/domTree/directives/domTreeItem.html',
    link: function(scope, elem) {
      scope.isEditable = function() {
        return scope.model.domElem.uibParams;
      };

      scope.hasIdentifier = function() {
        return !!scope.model.identifier;
      };

      scope.editElem = function() {
        ElemManager.startEditElem(scope.model.domElem);
      };

      scope.removeElem = function() {
        ElemManager.removeElem(scope.model.domElem);
      };
    }
  };
}

module.exports = DomTreeItemDirective;
