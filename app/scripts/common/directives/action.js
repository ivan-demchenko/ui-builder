'use strict';

module.exports = function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      icon: '@'
    },
    template: [
      '<button class="uib-btn"><i ng-class="icon"></i></button>'
    ].join('')
  };
};
