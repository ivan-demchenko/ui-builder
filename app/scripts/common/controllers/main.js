'use strict';

angular.module('uiBuilderApp.common')
  .controller('MainCtrl', function(Repository, Canvas) {

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
      this.sourse = Canvas.getSource();
      this.viewSourse = !this.viewSourse;
    };
  });
