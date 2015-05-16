'use strict';

/*@ngInject*/
function ResultTree($rootScope, Modal, Behavior) {
  this.tree = [];
  /**
   * Make drop of elem to target
   * @param  {DomElement} target  The element which will accept the drop event
   * @param  {hash} elementDescription  Description of the element beight dropped
   * @param  {string} position  Specifier where to insert a new element relatively to the target
   * @return {boolean}
   */
  this.dropElement = function(childrenSet, dropEvent) {
    childrenSet.push(JSON.parse(dropEvent.dataTransfer.getData('elementDescription')));
    Behavior.drop.success(this.tree);
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
  this.doneEditingElem = function(elem) {
    Modal.toggle('property-editor');
    $rootScope.$emit('uib:elem:edit:done', elem);
  };

  /**
   * Removed element from DOM.
   * @param  {DomElement} target The element to be removed
   * @return {undefined}
   */
  this.removeElem = function(elem) {
    elem.remove();
    $rootScope.$emit('uib:elem:remove', elem);
  };

}

module.exports = ResultTree

this.tree = [];
