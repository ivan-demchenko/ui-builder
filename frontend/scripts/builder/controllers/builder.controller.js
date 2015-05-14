'use strict';

/*@ngInject*/
function Controller(repository, Modal, Canvas) {

  this.repoItems = repository;
  this.domTree = {};

  this.toggleSourceView = function() {
    Modal.toggle('html-view');
  };

  this.getSource = function() {
    return Canvas.getSourceCode();
  };

}

module.exports = Controller;
