'use strict';

angular.module('uiBuilderApp')
  .service('dropProcess', function (domElemManioulations, domTreeParser, $rootScope) {

    this.dropElement = function (target, elemData) {
      target = angular.element(target);
      var elemModel = JSON.parse(elemData);
      var insElem = this.buildElementToDrop(elemModel);
      target.removeClass('drag').append(insElem);
      $rootScope.$emit('uib:elem:dropped', insElem);
    };

    this.unmarkTarget = function (target) {
      target.classList.remove('drag');
    };

    this.markTarget = function (target) {
      target.classList.add('drag');
    };

    this.startEditElem = function (elem) {
      if (elem.uibRemovable) {
        $rootScope.$emit('uib:elem:edit', elem);
      }
    };

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
      var newElement = angular.element(dropData.markup);

      // If the element suppose to have params, add them to the element itself
      if (dropData.params) {
        newElement[0].uibParams = dropData.params;
      }
      // Mark new element as the one that can be removed
      newElement[0].uibRemovable = true;
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
      props.forEach(function (prop) {
        if (prop.attr === 'class') {
          domElemManioulations.setClass(element, prop.value, prop.default);
        } else {
          domElemManioulations.setAttr(element, prop);
        }
      });
    };
  });
