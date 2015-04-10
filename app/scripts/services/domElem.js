'use strict';

angular.module('uiBuilderApp')
  .service('domElem', function () {

    this.canHaveChildren = function (tagName) {
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

    this.isParent = function (elem) {
      return elem.children.length > 0;
    };

    this.canChangeInnerText = function (elem) {
      return this.canHaveChildren(elem.tagName) && !this.isParent(elem);
    };

    this.containUIBParam = function (params, name) {
      return params.some(function (param) {
        return param.name === name;
      });
    };

    this.updateProps = function (elem) {
      elem.uibParams = elem.uibParams || [];
      if (this.canChangeInnerText(elem) && !this.containUIBParam(elem.uibParams, 'Inner text')) {
        elem.uibParams.push({
          name: 'Inner text',
          domAttr: 'innerText',
          value: elem.innerText
        });
      }
    };

    this.setClass = function (elem, value, defaultValue) {
      if (!value) {
        return;
      }
      var classList = [defaultValue].concat(value ? value.split(' ') : []);
      elem.setAttribute('class', classList.join(' '));
    };

    this.setAttr = function (elem, prop) {
      if (!prop.value) {
        return;
      }
      elem.setAttribute(prop.attr, prop.value);
    };

  });
