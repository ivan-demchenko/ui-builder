'use strict';

function WorkbenchDirective() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: __dirname + '/workbench.html',
    scope: {
      canvasSize: '=',
      sizeTable: '='
    },
    controller: 'WorkbenchController',
    controllerAs: 'wb'
  };
}

module.exports = WorkbenchDirective;
