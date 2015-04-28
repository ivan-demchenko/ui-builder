'use strict';

/*@ngInject*/
function MainController(Repository, Modal) {

  (function(ctrl) {
    Repository.getItems().then(function(data) {
      ctrl.repoItems = data;
    }.bind(this));
  })(this);

  this.repoItems = null;
  this.domTreeRoot = {};

  this.toggleSourceView = function() {
    Modal.toggle('html-view');
  };

}

module.exports = MainController;
