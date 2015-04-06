'use strict';

angular.module('uiBuilderApp')
  .controller('MainCtrl', function (Repository) {
    this.repoItems = null;
    this.domTreeRoot = {};

    this.asideViewState = 'repo';

    this.setAsideView = function (viewName) {
      this.asideViewState = viewName;
    };

    this.init = function () {
      Repository.getItems().then(angular.bind(this, function (data) {
        this.repoItems = data.data;
      }));
    };

    this.init();
  });
