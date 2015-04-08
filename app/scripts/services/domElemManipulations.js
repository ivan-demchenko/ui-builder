'use strict';

angular.module('uiBuilderApp')
  .service('domElemManipulations', function () {

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
