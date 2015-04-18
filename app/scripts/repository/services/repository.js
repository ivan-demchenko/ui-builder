'use strict';

angular.module('uiBuilderApp.repository')
  .service('Repository', function($http, $q) {

    this.repoInfo = null;

    this.setRepoInto = function(data) {
      this.repoInfo = data.data;
      return this.repoInfo;
    }.bind(this);

    this.getItems = function() {
      if (this.repoInfo) {
        return $q.when(this.repoInfo);
      }
      return $http.get('/data/repository.json').then(this.setRepoInto);
    };

  });
