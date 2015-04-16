'use strict';

angular.module('uiBuilderApp.common')
  .service('Common', function() {
    this.findOneByValue = function(arr, val) {
      return arr.filter(function(item) {
        return item.value === val;
      })[0].value;
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
