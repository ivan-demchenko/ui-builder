'use strict';

/*@ngInject*/
function ActionDirective() {
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
}

module.exports = ActionDirective;
