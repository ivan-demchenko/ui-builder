'use strict';

/*@ngInject*/
function ResultTree($rootScope, Modal) {

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

  /**
   * Swap items of a given array. Move gived item in a gived array to the right.
   * @param  {Object} elem    item that has to be moved
   * @param  {Array}  subTree gived array
   * @return {Array}          modified array
   * @example
   * var arr = [1,2,3,4,5];
   * moveElementUp(3, arr); // [1,2,4,3,5]
   */
  this.moveElementUp = function(elem, subTree) {
    var position = subTree.indexOf(elem);
    var temp = subTree[position];
    var itemBefore = subTree[position - 1];
    subTree[position - 1] = temp;
    subTree[position] = itemBefore;
    return subTree;
  };

  /**
   * Swap items of a given array. Move gived item in a gived array to the left.
   * @param  {Object} elem    item that has to be moved
   * @param  {Array}  subTree gived array
   * @return {Array}          modified array
   * @example
   * var arr = [1,2,3,4,5];
   * moveElementDown(3, arr); // [1,3,2,4,5]
   */
  this.moveElementDown = function(elem, subTree) {
    var position = subTree.indexOf(elem);
    var temp = subTree[position];
    var itemNext = subTree[position + 1];
    subTree[position + 1] = temp;
    subTree[position] = itemNext;
    return subTree;
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

  /**
   * Removed element from DOM.
   * @param  {DomElement} target The element to be removed
   * @return {undefined}
   */
  this.removeElem = function(tree, elem) {
    tree.splice(tree.indexOf(elem), 1);
    return this;
  };

}

module.exports = ResultTree;
