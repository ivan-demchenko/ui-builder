'use strict';

angular.module('uiBuilderApp')
  .controller('MainCtrl', function (Repository, canvas) {
    this.repoItems = null;
    this.domTreeRoot = {};

    this.addCSS = function () {
      var url = prompt('Enter URL to CSS File');
      if (url) {
        canvas.addStyles(url);
      }
    };

    this.addJS = function () {
      var url = prompt('Enter URL to JS File');
      if (url) {
        canvas.addJS(url);
      }
    };

    this.init = function () {
      Repository.getItems().then(angular.bind(this, function (data) {
        this.repoItems = data.data;
      }));
    };

    this.init();
  });
