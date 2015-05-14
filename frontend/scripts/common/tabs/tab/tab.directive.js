'use strict';

/*@ngInject*/
function TabDirective() {
  return {
    restrict: 'E',
    require: '^^uibTabs',
    replace: true,
    transclude: true,
    scope: {
      name: '@'
    },
    templateUrl: 'scripts/common/tabs/tab/tab.html',
    link: function(scope, element, attrs, tabsCtrl) {
      tabsCtrl.addTab(scope);
    }
  };
}

module.exports = TabDirective;
