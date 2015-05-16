'use strict';

/*@ngInject*/
function TabsCtrl($scope) {
  $scope.tabs = [];

  $scope.selectTab = function(tab) {
    $scope.tabs.forEach(function(_tab) {
      _tab.selected = false;
    });
    tab.selected = true;
  };

  this.addTab = function(tab) {
    if (!$scope.tabs.length) {
      $scope.selectTab(tab);
    }
    $scope.tabs.push(tab);
  };
}

/*@ngInject*/
function TabsDirective() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    templateUrl: __dirname + '/tabs.html',
    controller: TabsCtrl,
    link: function() {}
  };
}

module.exports = TabsDirective;
