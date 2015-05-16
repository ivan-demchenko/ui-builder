'use strict';

/*@ngInject*/
function Controller($rootScope, repository, ResultTree, initialCode,  Session, Builder, Modal, Canvas) {

  this.repoItems = repository;
  this.initial = initialCode;
  this.domTree = ResultTree.tree;

  this.toggleSourceView = function() {
    Modal.toggle('html-view');
  };

  this.setInitial = function() {
    Session.resetInitialCode(this.initial);
  };

  this.getSource = function() {
    return Canvas.getSourceCode();
  };

}

module.exports = Controller;
