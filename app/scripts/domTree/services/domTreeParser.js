'use strict';

angular.module('uiBuilderApp.domTree')
  .service('DomTreeParser', function() {

    function getElementIdentifier(elem) {
      var classListAsStr = Array.prototype.join.call(elem.classList, '.');
      return (elem.id ? '#' + elem.id : '') + (classListAsStr ? '.' + classListAsStr : '');
    }

    function domElemModel(elem) {
      return {
        domElem: elem,
        tagName: elem.tagName,
        identifier: getElementIdentifier(elem),
        children: Array.prototype.slice.call(elem.children)
      };
    }

    this.buildTree = function(root) {
      root = domElemModel(root);
      root.children = root.children.map(this.buildTree.bind(this));
      return root;
    };

  });
