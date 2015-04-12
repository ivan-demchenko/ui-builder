'use strict';

angular.module('uiBuilderApp')
  .service('ElemManager', function(DomElem, domTreeParser, $rootScope) {

    /**
     * Make drop of elem to target
     * @param  {DomElement} target The element which will accept the drop event
     * @param  {hash} elemData Description of the element beight dropped
     * @return {boolean}
     */
    this.dropElement = function(target, elemData) {
      var elemModel = JSON.parse(elemData);
      var elemToInsert = this.buildElementToDrop(elemModel);
      target.classList.remove('uib-drag');
      target.appendChild(elemToInsert);
      $rootScope.$emit('uib:elem:dropped', elemToInsert);
      return true;
    };

    /**
     * Mark target for drop so it is clean which element will accept drop
     * @param  {DomElement} target The element on which you want to drop
     * @return {undefined}
     */
    this.unmarkTarget = function(target) {
      target.classList.remove('uib-drag');
    };

    /**
     * Unmark target when mouse moves away
     * @param  {DomElement} target The element on which you just wanted to drop
     * @return {undefined}
     */
    this.markTarget = function(target) {
      target.classList.add('uib-drag');
    };

    /**
     * Send a signal that you use wants to edit an `elem`
     * @param  {DomElement} target The element to edit
     * @return {undefined}
     */
    this.startEditElem = function(elem) {
      DomElem.prepareElemPropsToEdit(elem);
      $rootScope.$emit('uib:elem:edit', elem);
    };

    /**
     * Send a signal that you use wants to edit an `elem`
     * @param  {DomElement} target The element to edit
     * @return {undefined}
     */
    this.doneEditingElem = function(elem) {
      this.resetAttrsForElement(elem);
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

    /**
     * This method accept element description as input param, check it's validity and
     * return new Angular element to be injected.
     * @param  {hash}   dropData Element description from repository.
     * @return {object}          Angular element
     */
    this.buildElementToDrop = function(dropData) {
      // Every element description object must have `markup` section.
      // Otherwise we can't use the element.
      if (!dropData.markup) {
        throw 'The markup for the element "' + dropData.name + '"" is not specified';
      }
      var newElement = angular.element(dropData.markup)[0];

      // If the element suppose to have params, add them to the element itself
      if (dropData.params) {
        newElement.uibParams = dropData.params;
      }
      // Mark new element as the one that can be removed
      newElement.uibRemovable = true;
      return newElement;
    };

    /**
     * This method set properties of given DOM element according to params stored in
     * `uibParams` hash of the DOM element.
     * @param  {DomElement} element DOM element to work with
     * @return {void}
     */
    this.resetAttrsForElement = function(element) {
      var props = element.uibParams;
      if (!props) {
        return;
      }
      props.forEach(function(prop) {
        if (prop.attr) {
          return DomElem.setAttr(element, prop.attr, prop.value, prop.inUser);
        }
        element[prop.domAttr] = prop.value;
      });
    };
  });
