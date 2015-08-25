'use strict';

/*@ngInject*/
function Controller($scope, repository, currentSession, Session, Behavior) {

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
  this.shareSessionURL = Session.getShareURL();
  this.editSettingsURL = Session.getEditSettingsUrl();

  // Every single time anything is changed in the result tree,
  // we save a snapshot. It might be anything, from element added to property
  // modified.
  $scope.$watch(function() {
    return this.resultTree;
  }.bind(this), function(newTree, oldTree) {
    if (oldTree.length > 0 || (newTree.length > 0 && oldTree.length === 0)) {
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
