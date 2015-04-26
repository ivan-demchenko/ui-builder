'use strict';

module.exports = function() {
    return function(node) {
      if (!!node.markup) {
        return 'uib-repository__item--movable';
      } else {
        return 'uib-repository__group';
      }
    };
  };
