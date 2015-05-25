'use strict';

function shiftItems(arr, position) {
  var partOne = arr.slice(0, position);
  var partTwo = arr.slice(position);

  var partOneLastEl = partOne.splice(position - 1, 1);
  var partTwoFstEl = partTwo.splice(0, 1);
  return partOne.concat(partTwoFstEl).concat(partOneLastEl.concat(partTwo));
}

function findContainingNode(tree, elem) {
  var res;
  if (tree.indexOf(elem) > -1) {
    res = tree;
  } else {
    tree.every(function(el) {
      if (el.children && el.children.length) {
        res = findContainingNode(el.children, elem);
      }
      return !!!res;
    });
  }
  return res;
}

/*@ngInject*/
function ResultTree($rootScope, Modal) {
  this.tree = [];

  /**
   * Setter for tree
   * @param {hash} tree The snapshot of the result tree
   */
  this.setTree = function(tree) {
    this.tree = tree;
    return this;
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
  };

  this.moveElementUp = function(elem, subtree) {
    var position = subtree.indexOf(elem);
    return shiftItems(subtree, position);
  };

  this.moveElementDown = function(elem, subtree) {
    var position = subtree.indexOf(elem) + 1;
    return shiftItems(subtree, position);
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
  };

  /**
   * Removed element from DOM.
   * @param  {DomElement} target The element to be removed
   * @return {undefined}
   */
  this.removeElem = function(elem) {
    var set = findContainingNode(this.tree, elem);
    if (set) {
      set.splice(set.indexOf(elem), 1);
    }
  };

}

module.exports = ResultTree;
