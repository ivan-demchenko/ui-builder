'use strict';

/* ngInject */
function WorkbenchDirective(WorkbenchSrvs) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: __dirname + '/workbench.html',
    link: function(scope) {
      scope.presets = WorkbenchSrvs.presets;
      scope.selectedSize = WorkbenchSrvs.selectedSize;
      scope.isRotated = WorkbenchSrvs.isRotated;
    }
  };
}

module.exports = WorkbenchDirective;
