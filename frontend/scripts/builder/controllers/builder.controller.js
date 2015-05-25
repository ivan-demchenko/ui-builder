'use strict';

/*@ngInject*/
function Controller($scope, repository, currentSession, ResultTree, Session, Behavior) {

  var latestSnapshot = currentSession.snapshots.length ? currentSession.snapshots[currentSession.snapshots.length - 1] : '[]';
  if (latestSnapshot.tree) {
    ResultTree.setTree(JSON.parse(latestSnapshot.tree));
  }

  $scope.$on('$destroy', Behavior.builder.turnOff);

  this.repoItems = repository;
  this.currentSession = currentSession;
  this.resultTree = ResultTree.tree;
  this.resultingHTML = '';
  this.currentSessionURL = Session.getShareURL();

  $scope.$watch(function() {
    return this.resultTree;
  }.bind(this), Behavior.resultTree.modified, true);

  this.updateSession = function() {
    Session.updateSession(this.currentSession);
  };

  this.fetchResult = function() {
    Session.renderSnapshot().then(function(html) {
      this.resultingHTML = html;
    }.bind(this));
  };

}

module.exports = Controller;
