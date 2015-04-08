'use strict';

angular.module('uiBuilderApp')
  .controller('MainCtrl', function (Repository, canvas) {
    this.init = function () {
      Repository.getItems().then(angular.bind(this, function (data) {
        this.repoItems = data;
      }));
    };

    this.repoItems = null;
    this.domTreeRoot = {};

    this.viewSourse = false;
    this.sourse = '';

    this.toggleSourceView = function () {
      this.sourse = canvas.getSource();
      this.viewSourse = !this.viewSourse;
    };

    this.init();
  });
