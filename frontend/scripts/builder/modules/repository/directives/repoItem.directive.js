'use strict';

var angular = require('angular');

/*@ngInject*/
function RepositoryItemDirective() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      model: '='
    },
    templateUrl: __dirname + '/repoItem.html',
    link: function(scope, elem) {

      elem.on('dragstart', function(evt) {
        if (!scope.model.tagName) {
          return evt.preventDefault();
        }
        var copy = angular.copy(scope.model);
        evt.dataTransfer.setData('elementDescription', JSON.stringify(copy));
        elem.addClass('drag-from');
      });

      elem.on('dragend', function() {
        elem.removeClass('drag-from');
      });

    }
  };
}

module.exports = RepositoryItemDirective;
