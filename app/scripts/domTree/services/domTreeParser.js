'use strict';

module.exports = ['DomElem',
function(DomElem) {

  function domElemModel(elem) {
    return {
      domElem: elem,
      tagName: elem.tagName,
      identifier: DomElem.getElementIdentifier(elem),
      children: Array.prototype.slice.call(elem.children)
    };
  }

  this.tree = null;

  this.setTree = function(tree) {
    this.tree = tree;
  };

  this.getTree = function() {
    return this.tree;
  };

  this.buildTree = function(root) {
    root = domElemModel(root);
    root.children = root.children.map(this.buildTree.bind(this));
    return root;
  };

}];
