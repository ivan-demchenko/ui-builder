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
function DomTreeItemDirective(ResultTree) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      model: '='
    },
    templateUrl: __dirname + '/domTreeItem.html',
    controller: function($scope) {
      $scope.isEditable = function() {
        return typeof $scope.model.parameters !== 'undefined';
      };

      $scope.editElem = function() {
        ResultTree.startEditElem($scope.model);
      };

      $scope.removeElem = function() {
        ResultTree.removeElem($scope.model);
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
        toggleElementHightlight(elem[0], false);
        togglePlaceholderHighlight(e.target, false);
        if (scope.model.children) {
          scope.$apply(function() {
            ResultTree.dropElement(scope.model.children, e);
          });
        }
      });
    }
  };
}

module.exports = DomTreeItemDirective;
