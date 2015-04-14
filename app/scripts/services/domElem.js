'use strict';

angular.module('uiBuilderApp')
  .service('DomElem', function() {

    this.canHaveChildren = function(element) {
      var e = null,
        res = false;
      try {
        e = document.createElement(element.tagName);
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
      return this.canHaveChildren(elem) && !this.isParent(elem);
    };

    this.containUIBParam = function(params, name) {
      return params.some(function(param) {
        return param.name === name;
      });
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
