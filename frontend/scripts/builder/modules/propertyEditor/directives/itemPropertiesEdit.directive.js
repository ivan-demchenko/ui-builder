'use strict';

/*@ngInject*/
function ItemPropertiesEditDirective($rootScope) {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    templateUrl: __dirname + '/itemPropertiesEdit.html',
    controller: function($scope) {
      $scope.elem = null;

      $scope.close = function() {
        $scope.elem = null;
      };

      $scope.getParamTemplateUrl = function(param) {
        return __dirname + '/subViews/' + param.type + '.html';
      };

      $rootScope.$on('uib:elem:edit:begin', function(evt, elem) {
        $scope.elem = elem;
      });

      $rootScope.$on('uib:elem:remove', function() {
        $scope.elem = null;
      });
    }
  };
}

module.exports = ItemPropertiesEditDirective;
