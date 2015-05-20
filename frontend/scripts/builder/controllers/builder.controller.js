'use strict';

/*@ngInject*/
function Controller($rootScope, $scope, $location, repository, currentSession, ResultTree, Session) {

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

  this.updateSession = function() {
    Session.updateSession(this.currentSession);
  };

  this.fetchResult = function() {
    Session.renderSnapshot().then(function(html) {
      this.resultingSnapshotHTML = html;
    }.bind(this));
  };

}

module.exports = Controller;
