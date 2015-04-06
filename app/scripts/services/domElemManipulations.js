'use strict';

angular.module('uiBuilderApp')
  .service('domElemManipulations', function () {

    this.setClass = function (elem, value, defaultValue) {
      var classList = [defaultValue].concat(value ? value.split(' ') : []);
      elem.setAttribute('class', classList.join(' '));
    };

    this.setAttr = function (elem, prop) {
      elem.setAttribute(prop.attr, prop.value);
    };

  });
