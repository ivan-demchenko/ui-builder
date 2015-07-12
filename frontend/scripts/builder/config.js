'use strict';

/*@ngInject*/
function fetchRepositoryItems(Repository) {
  return Repository.getItems();
}

/*@ngInject*/
function fetchSession($route, Session) {
  return Session.fetchFullSession($route.current.params.sessionId);
}

/*@ngInject*/
function config($routeProvider) {
  $routeProvider
    .when('/builder/:sessionId', {
      controller: 'BuilderCtrl as builder',
      templateUrl: __dirname + '/views/index.html',
      access: { requiredAuthentication: true },
      resolve: {
        repository: fetchRepositoryItems,
        currentSession: fetchSession
      }
    });
}

module.exports = config;
