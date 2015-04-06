'use strict';

angular.module('uiBuilderApp')
  .service('domTreeParser', function () {

    function domElemModel(elem) {
      return {
        domElem: elem,
        name: elem.tagName + '.' + Array.prototype.join.call(elem.classList, '.'),
        children: Array.prototype.slice.call(elem.children)
      };
    }

    this.buildTree = function (root) {
      root = domElemModel(root);
      root.children = root.children.map(this.buildTree.bind(this));
      return root;
    };

  });
