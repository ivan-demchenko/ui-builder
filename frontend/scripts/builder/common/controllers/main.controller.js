'use strict';

/*@ngInject*/
function MainController(Repository, Modal, User) {

  (function(ctrl) {
    Repository.getItems().then(function(data) {
      ctrl.repoItems = data;
    });
  })(this);

  this.repoItems = null;
  this.domTree = {};

  this.toggleSourceView = function() {
    Modal.toggle('html-view');
  };

}

module.exports = MainController;
