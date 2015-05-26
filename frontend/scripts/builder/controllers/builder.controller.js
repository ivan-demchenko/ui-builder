'use strict';

/*@ngInject*/
function Controller($scope, repository, currentSession, ResultTree, Session, Behavior) {

  var latestSnapshot = currentSession.snapshots[currentSession.snapshots.length - 1];
  if (latestSnapshot && latestSnapshot.tree) {
    this.resultTree = JSON.parse(latestSnapshot.tree);
  } else {
    this.resultTree = [];
  }

  $scope.$on('$destroy', Behavior.builder.turnOff);

  this.repoItems = repository;
  this.currentSession = currentSession;
  this.resultingHTML = '';
  this.currentSessionURL = Session.getShareURL();

  $scope.$watch(function() {
    return this.resultTree;
  }.bind(this), function(newTree) {
    if (newTree && Array.isArray(newTree) && newTree.length) {
      Behavior.resultTree.modified(newTree);
    }
  }, true);

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
