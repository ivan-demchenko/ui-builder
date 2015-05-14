'use strict';

var angular = require('angular');

/*@ngInject*/
function Service($http, $location) {
  this._id = null;

  this.getCurrentSessionUrl = function() {
    return '/api/session/result/' + this._id;
  };

  this.startNew = function(title, initialSetup) {
    return $http.post('/api/session/new', {
      title: title,
      initialSetup: initialSetup
    }).then(function(resp) {
      if (angular.isObject(resp.data.data) && angular.isString(resp.data.data.sessionId)) {
        this._id = resp.data.data.sessionId;
        return $location.path('builder/' + resp.data.data.sessionId);
      }
    }.bind(this));
  };

  this.continue = function(id) {
    this._id = id;
  };

  this.saveSnapshot = function() {};

}

module.exports = Service;
