'use strict';

angular.module('uiBuilderApp')
  .service('dropProcess', function (domElem, domTreeParser, $rootScope) {

    /**
     * Make drop of elem to target
     * @param  {domElement} target The element which will accept the drop event
     * @param  {hash} elemData Description of the element beight dropped
     * @return {boolean}
     */
    this.dropElement = function (target, elemData) {
      var elemModel = JSON.parse(elemData);
      var insElem = this.buildElementToDrop(elemModel);
      target.classList.remove('uib-drag');
      target.appendChild(insElem);
      $rootScope.$emit('uib:elem:dropped', insElem);
      return true;
    };

    /**
     * Mark target for drop so it is clean which element will accept drop
     * @param  {domElement} target The element on which you want to drop
     * @return {undefined}
     */
    this.unmarkTarget = function (target) {
      target.classList.remove('uib-drag');
    };

    /**
     * Unmark target when mouse moves away
     * @param  {domElement} target The element on which you just wanted to drop
     * @return {undefined}
     */
    this.markTarget = function (target) {
      target.classList.add('uib-drag');
    };

    /**
     * Send a signal that you use wants to edit an `elem`
     * @param  {domElement} target The element to edit
     * @return {undefined}
     */
    this.startEditElem = function (elem) {
      $rootScope.$emit('uib:elem:edit', elem);
    };

    /**
     * Removed element from DOM.
     * @param  {domElement} target The element to be removed
     * @return {undefined}
     */
    this.removeElem = function (elem) {
      elem.remove();
    };

    /**
     * This method accept element description as input param, check it's validity and
     * return new Angular element to be injected.
     * @param  {hash}   dropData Element description from repository.
     * @return {object}          Angular element
     */
    this.buildElementToDrop = function (dropData) {
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
     * @param  {DOMElement} element DOM element to work with
     * @return {void}
     */
    this.resetAttrsForElement = function (element) {
      var props = element.uibParams;
      if (!props) {
        return;
      }
      props.forEach(function (prop) {
        if (prop.domAttr) {
          element[prop.domAttr] = prop.value;
        }
        if (prop.attr && prop.attr === 'class') {
          domElem.setClass(element, prop.value, prop.default);
        } else {
          domElem.setAttr(element, prop);
        }
      });
    };
  });
