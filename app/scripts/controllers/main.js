'use strict';

angular.module('uiBuilderApp')
  .controller('MainCtrl', function(Repository, canvas) {

    (function(ctrl) {
      Repository.getItems().then(angular.bind(ctrl, function(data) {
        ctrl.repoItems = data;
      }));
    })(this);

    this.repoItems = null;
    this.domTreeRoot = {};

    this.viewSourse = false;
    this.sourse = '';

    this.toggleSourceView = function() {
      this.sourse = canvas.getSource();
      this.viewSourse = !this.viewSourse;
    };
  });
