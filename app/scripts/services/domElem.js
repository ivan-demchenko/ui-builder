'use strict';

angular.module('uiBuilderApp')
  .service('domElem', function() {

    this.canHaveChildren = function(tagName) {
      var e = null,
        res = false;
      try {
        e = document.createElement(tagName);
        res = e.outerHTML.indexOf('/') > 0;
      } catch (e) {
        res = false;
      } finally {
        e = null;
      }
      return res;
    };

    this.isParent = function(elem) {
      return elem.children.length > 0;
    };

    this.canChangeInnerText = function(elem) {
      return this.canHaveChildren(elem.tagName) && !this.isParent(elem);
    };

    this.containUIBParam = function(params, name) {
      return params.some(function(param) {
        return param.name === name;
      });
    };

    this.prepareElemPropsToEdit = function(elem) {
      var val;
      elem.uibParams = elem.uibParams || [];
      if (elem.classList.length > 0 && !this.containUIBParam(elem.uibParams, 'Class')) {
        val = Array.prototype.join.call(elem.classList, ' ');
        elem.uibParams.push({
          name: 'Class',
          attr: 'class',
          value: val,
          inUse: !!val
        });
      }
      if (this.canChangeInnerText(elem) && !this.containUIBParam(elem.uibParams, 'Inner text')) {
        elem.uibParams.push({
          name: 'Inner text',
          domAttr: 'innerText',
          value: elem.innerText,
          inUse: undefined
        });
      }
    };

    this.setAttr = function(elem, name, value, isInUse) {
      if (isInUse === false) {
        return elem.removeAttribute(name);
      }
      if (value) {
        return elem.setAttribute(name, value);
      }
    };

  });
