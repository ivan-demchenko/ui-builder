'use strict';

/*@ngInject*/
function Controller($rootScope, $scope, $location, repository, latestSnapshot, initialCode, ResultTree, Session, Builder, Modal) {

  ResultTree.setTree(latestSnapshot);

  $scope.$on('$destroy', function() {
    ResultTree.setTree(null);
  });

  this.repoItems = repository;
  this.initial = initialCode;
  this.resultTree = ResultTree.tree;
  this.resultingSnapshotHTML = '';
  this.currentSessionURL = $location.protocol() + '://' +
    $location.host() + ':' + $location.port() +
    Session.getResultingURL();

  this.toggleSourceView = function() {
    Modal.toggle('html-view');
  };

  this.setInitial = function() {
    Session.resetInitialCode(this.initial);
  };

  this.fetchResult = function() {
    this.resultingSnapshotHTML = Session.fetchSnapshotHTML();
  };

}

module.exports = Controller;
