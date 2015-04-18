'use strict';

moment.locale('en');

angular.module('testApp', ['ys.components']);

angular.module('testApp')
  .controller('A', function($scope) {
    $scope.dt = 1;
  });

angular.element(document).ready(function() {
  angular.bootstrap(document, ['testApp']);
});
