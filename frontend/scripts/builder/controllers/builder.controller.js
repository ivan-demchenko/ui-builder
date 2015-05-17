'use strict';

/*@ngInject*/
function Controller($rootScope, $location, repository, latestSnapshot, initialCode, ResultTree, Session, Builder, Modal) {

  this.repoItems = repository;
  this.initial = initialCode;
  ResultTree.setTree(latestSnapshot);
  this.domTree = ResultTree.tree;
  this.currentSessionURL = $location.protocol() + '://' +
    $location.host() +
    Session.getResultingURL();

  this.toggleSourceView = function() {
    Modal.toggle('html-view');
  };

  this.setInitial = function() {
    Session.resetInitialCode(this.initial);
  };

}

module.exports = Controller;
