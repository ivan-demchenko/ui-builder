'use strict';

/*@ngInject*/
function fetchRepositoryItems(Repository) {
  return Repository.getItems();
}

/*@ngInject*/
function fetchInitialCode($route, Builder) {
  return Builder.fetchInitialCode($route.current.params.sessionId);
}

/*@ngInject*/
function fetchLatestSnapshot($route, Session) {
  return Session.getLatestSnapshot();
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
        initialCode: fetchInitialCode,
        latestSnapshot: fetchLatestSnapshot
      }
    });
}

module.exports = config;
