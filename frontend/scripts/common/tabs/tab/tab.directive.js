'use strict';

/*@ngInject*/
function TabDirective() {
  return {
    restrict: 'E',
    require: '^^uibTabs',
    replace: true,
    transclude: true,
    scope: {
      icon: '@',
      name: '@'
    },
    templateUrl: __dirname + '/tab.html',
    link: function(scope, element, attrs, tabsCtrl) {
      tabsCtrl.addTab(scope);
    }
  };
}

module.exports = TabDirective;
