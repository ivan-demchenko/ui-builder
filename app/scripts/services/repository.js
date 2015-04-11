'use strict';

angular.module('uiBuilderApp')
  .service('Repository', function($http) {

    this.repoInfo = null;

    this.setRepoInto = function(data) {
      this.repoInfo = data.data;
      return this.repoInfo;
    }.bind(this);

    this.getItems = function() {
      if (this.repoInfo) {
        return this.repoInfo;
      }
      return $http.get('/data/repository.json').then(this.setRepoInto);
    };

  });
