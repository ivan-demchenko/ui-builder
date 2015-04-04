'use strict';

angular.module('uiBuilderApp')
  .service('Repository', function ($http) {
    this.getItems = function () {
      return $http.get('/data/repository.json');
    };
  });
