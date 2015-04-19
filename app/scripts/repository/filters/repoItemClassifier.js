'use strict';

angular.module('uiBuilderApp.repository')
  .filter('repoItemClassifier', function() {
    return function(node) {
      if (!!node.markup) {
        return 'uib-repository__item--movable';
      } else {
        return 'uib-repository__group';
      }
    };
  });
