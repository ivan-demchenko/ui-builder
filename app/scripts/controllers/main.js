'use strict';

angular.module('uiBuilderApp')
  .controller('MainCtrl', function ($scope, $timeout, Repository) {
    this.repoItems = [];

    Repository.getItems().then(function (data) {
      this.repoItems = data.data;
    }.bind(this));
  });
