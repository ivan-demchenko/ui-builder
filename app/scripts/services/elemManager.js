'use strict';

angular.module('uiBuilderApp')
  .service('ElemManager', function(DomElem, domTreeParser, $rootScope, Common) {
    /**
     * Make drop of elem to target
     * @param  {DomElement} target The element which will accept the drop event
     * @param  {hash} elementDescription Description of the element beight dropped
     * @return {boolean}
     */
    this.dropElement = function(target, elementDescription) {
      var elemModel = JSON.parse(elementDescription);
      var elemToInsert = this.buildElementToDrop(elemModel);
      this.resetAttrsForElement(elemToInsert);
      target.classList.remove('drop-to');
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
      target.classList.remove('drop-to');
    };

    /**
     * Unmark target when mouse moves away
     * @param  {DomElement} target The element on which you just wanted to drop
     * @return {undefined}
     */
    this.markTarget = function(target) {
      target.classList.add('drop-to');
    };

    /**
     * Send a signal that you use wants to edit an `elem`
     * @param  {DomElement} target The element to edit
     * @return {undefined}
     */
    this.startEditElem = function(elem) {
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
     * @param  {hash}   elementDescription Element description from repository.
     * @return {object}          Angular element
     */
    this.buildElementToDrop = function(elementDescription) {
      // Every element description object must have `markup` section.
      // Otherwise we can't use the element.
      if (!elementDescription.markup) {
        throw 'The markup for the element "' + elementDescription.name + '"" is not specified';
      }
      if (elementDescription.parameters) {
        elementDescription.parameters.forEach(function(param) {
          param.inUse = true;
          param.value = param.value ? Common.findOneByValue(param.possibleValues, param.value) : '';
        });
      }
      var newElement = angular.element(elementDescription.markup)[0];

      // If the element suppose to have params, add them to the element itself
      if (elementDescription.parameters) {
        newElement.uibParams = elementDescription.parameters;
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
      if (!element.uibParams) {
        return;
      }
      element.uibParams.forEach(function(prop) {
        if (prop.attr) {
          if (!prop.inUse) {
            return DomElem.removeValueOfAttr(element, prop);
          } else {
            return DomElem.setValueOfParam(element, prop);
          }
        }
        element[prop.domAttr] = prop.value;
        return;
      });
    };
  });
