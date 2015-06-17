'use strict';

/*@ngInject*/
function ItemPropertiesEditDirective($rootScope) {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    templateUrl: __dirname + '/itemPropertiesEdit.html',

    // TODO: move it into a separate file
    controller: function($scope) {
      $scope.elem = null;
      // TODO: bind methods to controller
      $scope.close = function() {
        $scope.elem = null;
      };

      $scope.removeBehaviour = function(element, behav) {
        var pos = element.behaviours.indexOf(behav);
        if (window.confirm('Are you sure')) {
          element.behaviours.splice(pos, 1);
        }
      };

      $scope.getParamTemplateUrl = function(param) {
        return __dirname + '/parameters/' + param.type + '.html';
      };

      $scope.getBehaviourTemplateUrl = function(behav) {
        return __dirname + '/behaviours/' + behav.optionsType + '.html';
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
