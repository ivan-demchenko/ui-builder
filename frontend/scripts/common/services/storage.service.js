'use strict';

/*@ngInject*/
function Storage($window) {
  this.set = function(key, val) {
    return $window.localStorage.setItem(key, val);
  };

  this.get = function(key) {
    return $window.localStorage.getItem(key);
  };

  this.remove = function(key) {
    return $window.localStorage.removeItem(key);
  };
}

module.exports = Storage;
