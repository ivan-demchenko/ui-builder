'use strict';

angular.module('uiBuilderApp.common')
  .service('Common', function() {
    this.findOneByValue = function(arr, val) {
      return arr.filter(function(item) {
        return item.value === val;
      })[0].value;
    };

    this.hasParent = function(elem, className) {
      var res = false;
      while (elem.parentElement) {
        elem = elem.parentElement;
        if (elem.classList.contains(className)) {
          res = true;
          break;
        }
      }
      return res;
    };

    this.domPath = function(element) {
      var path = '',
      i, innerText, tag, selector, classes;

      element = element.parentNode;

      for (i = 0; element && element.nodeType === 1; element = element.parentNode, i++) {
        innerText = element.childNodes.length === 0 ? element.innerHTML : '';
        tag = element.tagName.toLowerCase();
        classes = element.className;

        if (tag === 'html' || tag === 'body') {
          continue;
        }

        if (element.id !== '') {
          selector = '#' + element.id;
        } else if (classes.length > 0) {
          selector = tag + '.' + classes.replace(/ /g, '.');
        } else {
          selector = tag + ((innerText.length > 0) ? ':contains("' + innerText + '")' : '');
        }

        path = ' ' + selector + path;
      }
      return path;
    };

    this.prop = function(name) {
      return function(obj) {
        return obj[name];
      };
    };

    this.extract = function(arr, propName) {
      return arr.map(this.prop(propName));
    };

    this.inArray = function(arr) {
      return function(elem) {
        return arr.indexOf(elem) > -1;
      };
    };

    this.notInArray = function(arr) {
      return function(elem) {
        return arr.indexOf(elem) === -1;
      };
    };

    this.similarElems = function(arr1, arr2) {
      return arr1.filter(this.inArray(arr2));
    };

    this.withOut = function(arr1, arr2) {
      return arr1.filter(this.notInArray(arr2));
    };

  });
