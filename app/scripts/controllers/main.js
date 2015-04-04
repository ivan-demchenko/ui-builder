'use strict';

angular.module('uiBuilderApp')
  .controller('MainCtrl', function ($scope, $timeout, Repository) {
    this.repoItems = [];

    this.init = function () {
      Repository.getItems().then(angular.bind(this, function (data) {
        this.repoItems = data.data;
      }));
    };

    this.init();
  });
