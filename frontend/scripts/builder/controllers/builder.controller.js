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

  this.sizeTable = [
    { width: '100%', height: '100%', name: 'None' },
    { width: '768px', height: '1024px', name: 'iPad (portrate)' },
    { width: '1024px', height: '769px',  name: 'iPad (landscape)'},
    { width: '320px', height: '480px', name: 'iPhone 4' },
    { width: '320px', height: '568px', name: 'iPhone 5' },
    { width: '375px', height: '667px', name: 'iPhone 6' },
    { width: '360px', height: '640px', name: 'Nexus 5' }
  ];
  this.canvasSize = this.sizeTable[0].name;
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
