'use strict';

function fetchRepositoryItems(Repository) {
  return Repository.getItems();
}

/*@ngInject*/
function config($routeProvider) {
  $routeProvider
    .when('/builder/:sessionId', {
      controller: 'BuilderCtrl as builder',
      templateUrl: 'scripts/builder/views/index.html',
      access: { requiredAuthentication: true },
      resolve: {
        repository: fetchRepositoryItems
      }
    });
}

module.exports = config;
