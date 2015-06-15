'use strict';

/*@ngInject*/
function repoItemClassifierFilter() {
  return function(node) {
    if (node.tagName) {
      return 'uib-repository__item--movable';
    } else {
      return 'uib-repository__group';
    }
  };
}

module.exports = repoItemClassifierFilter;
