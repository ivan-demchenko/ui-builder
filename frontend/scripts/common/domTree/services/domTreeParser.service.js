'use strict';

var DomElemModel = require('../../models/domElementModel');

/*@ngInject*/
function DomTreeParserService(DomElem) {

  this.tree = null;

  this.setTree = function(tree) {
    this.tree = tree;
  };

  this.getTree = function() {
    return this.tree;
  };

  this.buildTree = function(root) {
    root = new DomElemModel(root, DomElem.getElementIdentifier(root));
    root.children = root.children.map(this.buildTree.bind(this));
    return root;
  };

}

module.exports = DomTreeParserService;
