'use strict';

function ScreenSizeSelectorDirective() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      selectedSize: '=',
      presets: '=',
      rotated: '='
    },
    templateUrl: __dirname + '/screenSizeSelector.html'
  };
}

module.exports = ScreenSizeSelectorDirective;
