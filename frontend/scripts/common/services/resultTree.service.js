'use strict';

function hasChildren(el) {
  return el.children && el.children.length;
}

// TODO: optimise it
function findParentTree(node, elem) {
  var res;
  if (node.indexOf(elem) !== -1) {
    res = node;
  } else {
    if (node && node.length) {
      for (var i = 0, el = node[i]; i < node.length; i++) {
        if (hasChildren(el)) {
          res = findParentTree(el.children, elem, res);
        }
        if (res) {
          return res;
        }
      }
    }
  }
  return res;
}

/*@ngInject*/
function ResultTree($rootScope, Modal, Behavior) {
  this.tree = [];

  /**
   * Setter for tree
   * @param {hash} tree The snapshot of the result tree
   */
  this.setTree = function(tree) {
    this.tree = tree;
  };

  /**
   * Make drop of elem to target
   * @param  {DomElement} target  The element which will accept the drop event
   * @param  {hash} elementDescription  Description of the element beight dropped
   * @param  {string} position  Specifier where to insert a new element relatively to the target
   * @return {boolean}
   */
  this.dropElement = function(childrenSet, dropEvent) {
    childrenSet.push(JSON.parse(dropEvent.dataTransfer.getData('elementDescription')));
    Behavior.resultTree.modified(this.tree);
  };

  /**
   * Mark target for drop so it is clean which element will accept drop
   * @param  {DomElement} target The element on which you want to drop
   * @return {undefined}
   */
  this.markTarget = function(target) {
    target.classList.remove('drop-to');
  };

  /**
   * Mark target for drop so it is clean which element will accept drop
   * @param  {DomElement} target The element on which you want to drop
   * @return {undefined}
   */
  this.unmarkTarget = function(target) {
    target.classList.remove('drop-to');
  };

  /**
    * Send a signal that you use wants to edit an `elem`
    * @param  {DomElement} target The element to edit
    * @return {undefined}
    */
   this.startEditElem = function(elem) {
     Modal.toggle('property-editor');
     $rootScope.$emit('uib:elem:edit:begin', elem);
   };

  /**
   * Send a signal that you use wants to edit an `elem`
   * @param  {DomElement} target The element to edit
   * @return {undefined}
   */
  this.doneEditingElem = function() {
    Modal.toggle('property-editor');
    Behavior.resultTree.modified(angular.copy(this.tree));
  };

  /**
   * Removed element from DOM.
   * @param  {DomElement} target The element to be removed
   * @return {undefined}
   */
  this.removeElem = function(elem) {
    var set = findParentTree(this.tree, elem);
    if (set) {
      set.splice(set.indexOf(elem), 1);
      Behavior.resultTree.modified(angular.copy(this.tree));
    }
  };

}

module.exports = ResultTree;
