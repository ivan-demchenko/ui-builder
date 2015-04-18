'use strict';

angular.module('uiBuilderApp.common')
  .controller('MainCtrl', function(Repository, Canvas) {

    (function(ctrl) {
      Repository.getItems().then(function(data) {
        ctrl.repoItems = data;
      }.bind(this));
    })(this);

    this.repoItems = null;
    this.domTreeRoot = {};

    this.viewSourse = false;
    this.sourse = '';

    this.toggleSourceView = function() {
      this.sourse = Canvas.getSourceCode();
      this.viewSourse = !this.viewSourse;
    };
  });
