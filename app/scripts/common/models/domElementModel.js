'use strict';

function DomElemModel(elem, identifier) {
  this.domElem = elem;
  this.tagName = elem.tagName;
  this.identifier = identifier;
  this.children = Array.prototype.slice.call(elem.children);
}

module.exports = DomElemModel;
