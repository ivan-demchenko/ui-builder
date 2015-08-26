'use strict';

/*@ngInject*/
function ItemPropertiesEditDirective() {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    templateUrl: __dirname + '/itemPropertiesEdit.html',
    controller: 'ItemPropertiesEditController',
    controllerAs: 'propsEditor'
  };
}

module.exports = ItemPropertiesEditDirective;
