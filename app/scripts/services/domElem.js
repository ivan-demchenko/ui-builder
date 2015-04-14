'use strict';

angular.module('uiBuilderApp')
  .service('DomElem', function(Common) {

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

    this.removeValueOfAttr = function(element, prop) {
      var possibleValues = Common.extract(prop.possibleValues, 'value');
      var existingValues = element.getAttribute(prop.attr).split(' ');
      var diff = Common.similarElems(possibleValues, existingValues);
      if (diff.length > 0) {
        element.setAttribute(prop.attr, Common.withOut(existingValues, diff));
      }
    };

    this.setValueOfParam = function(element, prop) {
      var existingValues = element.getAttribute(prop.attr);
      existingValues = existingValues ? existingValues.split(' ') : [];
      var newSet = Common.withOut(existingValues, Common.similarElems(existingValues, Common.extract(prop.possibleValues, 'value')));
      newSet.push(prop.value);
      element.setAttribute(prop.attr, newSet.join(' '));
    };

  });
