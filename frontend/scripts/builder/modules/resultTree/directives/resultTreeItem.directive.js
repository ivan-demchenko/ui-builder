'use strict';

var angular = require('angular');

/*@ngInject*/
function ResultTreeItemDirective($compile, ResultTree) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      model: '=',
      canMoveUp: '&',
      canMoveDown: '&',
      moveUp: '&',
      moveDown: '&',
      edit: '&',
      remove: '&'
    },
    templateUrl: __dirname + '/resultTreeItem.html',
    controller: 'ResultTreeItemController',
    link: function(scope, elem) {

      scope.elemId = Math.random().toString(16).substr(2);

      // TODO: Refactor this hell
      scope.$watch(function() {
        return scope.model.children ? scope.model.children.length : 0;
      }, function(newVal) {
        if (newVal === 0 && elem.find('ul').length > 0) {
          return elem.find('ul').remove();
        } else {
          if (elem.find('ul').length === 0 && (scope.model.children && scope.model.children.length > 0)) {
            $compile('<uib-result-tree tree="model.children"></uib-result-tree>')(scope, function(cloned) {
              elem.append(cloned);
            });
          }
        }
      });

      elem[0].addEventListener('dragstart', function(evt) {
        evt.stopPropagation();
        var copy = angular.copy(scope.model);
        copy.elemId = scope.elemId;
        evt.dataTransfer.setData('elementDescription', JSON.stringify(copy));
      });

      elem[0].addEventListener('drop', function(e) {
        e.stopPropagation();
        var dropData = JSON.parse(e.dataTransfer.getData('elementDescription'));
        if (dropData.elemId === scope.elemId) {
          e.preventDefault();
          return;
        }
        ResultTree.dropElement(scope.model, dropData);
        return false;
      });
    }
  };
}

module.exports = ResultTreeItemDirective;
