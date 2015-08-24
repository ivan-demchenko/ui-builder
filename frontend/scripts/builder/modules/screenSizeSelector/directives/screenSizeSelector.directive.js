'use strict';

function ScreenSizeSelectorDirective() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      model: '=',
      sizeTable: '='
    },
    templateUrl: __dirname + '/screenSizeSelector.html',
    controller: 'screenSizeSelectorController',
    controllerAs: 'sss'
  };
}

module.exports = ScreenSizeSelectorDirective;
