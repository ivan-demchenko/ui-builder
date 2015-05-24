'use strict';

var angular = require('angular');

/*@ngInject*/
function Session($q, $http, $location) {
  this.session = null;

  this.getResultingURL = function() {
    return '/api/session/' + this.session._id + '/result';
  };

  this.getShareURL = function() {
    return '/s/' + this.session.sharedId;
  };

  this.dropSession = function() {
    this.session = null;
  };

  this.renderSnapshot = function() {
    return $http.get('/api/session/' + this.session._id + '/snapshot/latest/render').then(function(resp) {
      return resp.data.data;
    });
  };

  this.startNew = function(title, initialSetup) {
    return $http.post('/api/session', {
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
      return $q.when(this.session);
    }
    return $http.get('/api/session/' + id).then(function(resp) {
      this.session = resp.data.data;
      return this.session;
    }.bind(this));
  };

  this.updateSession = function(session) {
    return $http.put('/api/session/' + this.session._id, session).then(function(resp) {
      return resp.data.data;
    });
  };

  this.saveSnapshot = function(tree) {
    return $http.post('/api/session/' + this.session._id + '/snapshot', {tree: tree});
  };

}

module.exports = Session;
