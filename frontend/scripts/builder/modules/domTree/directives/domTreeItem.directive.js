'use strict';

function toggleElementHightlight(elem, state) {
  elem.classList[state ? 'add' : 'remove']('uib-dom-tree__item--hovered');
}

function togglePlaceholderHighlight(placeholder, state) {
  placeholder.classList[state ? 'add' : 'remove']('uib-dom-tree__item__placeholder--hovered');
}

function preventDefault(e) {
  e.preventDefault();
}

/*@ngInject*/
function DomTreeItemDirective(ElemManager) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      model: '='
    },
    templateUrl: 'scripts/builder/modules/domTree/directives/domTreeItem.html',
    controller: function($scope) {
      $scope.isEditable = function() {
        return $scope.model.domElem.uibParams;
      };

      $scope.hasIdentifier = function() {
        return !!$scope.model.identifier;
      };

      $scope.editElem = function() {
        ElemManager.startEditElem($scope.model.domElem);
      };

      $scope.removeElem = function() {
        ElemManager.removeElem($scope.model.domElem);
      };
    },
    link: function(scope, elem) {
      // `dragleave` fires after `dragenter` for nested elements. Thus wee need a
      // deep counter in order to determine from where do we leave.
      var deep = 0;

      elem[0].addEventListener('dragover', preventDefault);

      elem[0].addEventListener('dragenter', function(e) {
        deep++;
        toggleElementHightlight(elem[0], true);
        togglePlaceholderHighlight(e.target, true);
      });

      elem[0].addEventListener('dragleave', function(e) {
        if (--deep === 0) {
          toggleElementHightlight(elem[0], false);
        }
        togglePlaceholderHighlight(e.target, false);
      });

      // Target may be a DIV with class which specifies in which place to insert a new element
      elem[0].addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var target = e.target;
        var elemDescription = e.dataTransfer.getData('elementDescription');
        toggleElementHightlight(elem[0], false);
        togglePlaceholderHighlight(e.target, false);
        if (target.classList.contains('placeholder--before')) {
          return ElemManager.dropElement(scope.model.domElem, elemDescription, 'before');
        } else if (target.classList.contains('placeholder--child')) {
          return ElemManager.dropElement(scope.model.domElem, elemDescription, 'child');
        } else if (target.classList.contains('placeholder--after')) {
          return ElemManager.dropElement(scope.model.domElem, elemDescription, 'after');
        }
      });
    }
  };
}

module.exports = DomTreeItemDirective;
