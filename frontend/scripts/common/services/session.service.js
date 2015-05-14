'use strict';

var angular = require('angular');

/*@ngInject*/
function Service($http, $location) {
  this._id = null;

  this.startNew = function(initialSetup) {
    return $http.post('/api/session/new', initialSetup).then(function(resp) {
      if (angular.isObject(resp.data.data) && angular.isString(resp.data.data.sessionId)) {
        this._id = resp.data.data.sessionId;
        return $location.path('builder/' + resp.data.data.sessionId);
      }
    }.bind(this));
  };

  this.saveSnapshot = function() {};

}

module.exports = Service;
