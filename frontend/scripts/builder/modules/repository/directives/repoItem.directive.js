'use strict';

var angular = require('angular'),
    // R = require('ramda'),
    Bacon = require('baconjs');

/*@ngInject*/
function RepositoryItemDirective($compile) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      model: '='
    },
    templateUrl: __dirname + '/repoItem.html',
    link: function(scope, elem) {
      var domEl = elem[0];
      var dragStart = Bacon.fromEvent(domEl, 'dragstart').doAction('.stopPropagation');
      var dragEnd = Bacon.fromEvent(domEl, 'dragend').doAction('.stopPropagation');
      var addClassStream = dragStart.map('addClass');
      var remClassStream = dragEnd.map('removeClass');

      addClassStream.merge(remClassStream).onValue(function(classAction) {
        elem[classAction]('drag-from');
      });

      dragStart.onValue(function(evt) {
        var copy = angular.copy(scope.model);
        evt.dataTransfer.setData('elementDescription', JSON.stringify(copy));
      });

      if (Array.isArray(scope.model.subNodes) && scope.model.subNodes.length) {
        $compile('<uib-repo-items-tree tree="model"></uib-repo-items-tree>')(scope, function(cloned) {
          elem.append(cloned);
        });
      }
    }
  };
}

module.exports = RepositoryItemDirective;
