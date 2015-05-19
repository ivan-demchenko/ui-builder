'use strict';

/*@ngInject*/
function Controller($rootScope, $scope, $location, repository, currentSession, ResultTree, Session, Builder, Modal) {

  var latestSnapshot = currentSession.snapshots.length ? currentSession.snapshots[currentSession.snapshots.length-1] : '[]';
  if (latestSnapshot.tree) {
    ResultTree.setTree(JSON.parse(latestSnapshot.tree));
  }

  $scope.$on('$destroy', function() {
    ResultTree.setTree(null);
  });

  this.repoItems = repository;
  this.initial = currentSession.initial;
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
    Session.fetchSnapshotHTML().then(function(html) {
      this.resultingSnapshotHTML = html;
    }.bind(this));
  };

}

module.exports = Controller;
