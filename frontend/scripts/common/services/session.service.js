'use strict';

var angular = require('angular');

/*@ngInject*/
function Session($q, $http, $location) {
  this.session = null;

  this.getResultingURL = function() {
    return '/api/session/' + this.session._id + '/result';
  };

  this.getLatestSnapshot = function() {
    return $http.get('/api/session/' + this.session._id + '/snapshot/latest').then(function(resp) {
      return resp.data;
    });
  };

  this.fetchSnapshotHTML = function() {
    return $http.get('/api/session/' + this.session._id + '/snapshot/latest/html').then(function(resp) {
      return resp.data.data;
    });
  };

  this.startNew = function(title, initialSetup) {
    return $http.post('/api/session/new', {
      title: title,
      initialSetup: initialSetup
    }).then(function(resp) {
      if (angular.isObject(resp.data.data)) {
        this.session = resp.data.data;
        return $location.path('builder/' + this.session._id);
      }
    }.bind(this));
  };

  this.fetchSession = function(id) {
    if (this.session && this.session._id === id) {
      return this.session;
    }
    return $http.get('/api/session/' + id).then(function(resp) {
      this.session = resp.data.data;
      return this.session;
    }.bind(this));
  };

  this.resetInitialCode = function(initial) {
    return $http.put('/api/session/' + this.session._id + '/initial', {initial: initial}).then(function(resp) {
      return resp.data.data;
    });
  };

  this.saveSnapshot = function(tree) {
    return $http.post('/api/session/' + this.session._id + '/snapshot', {tree: tree});
  };

  this.continue = function(id) {
    this.session._id = id;
  };

}

module.exports = Session;
