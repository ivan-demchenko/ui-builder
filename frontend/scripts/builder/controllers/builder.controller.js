'use strict';

/*@ngInject*/
function Controller($rootScope, repository, latestSnapshot, initialCode, ResultTree, Session, Builder, Modal) {

  this.repoItems = repository;
  this.initial = initialCode;
  ResultTree.setTree(latestSnapshot);
  this.domTree = ResultTree.tree;

  this.toggleSourceView = function() {
    Modal.toggle('html-view');
  };

  this.setInitial = function() {
    Session.resetInitialCode(this.initial);
  };

}

module.exports = Controller;
