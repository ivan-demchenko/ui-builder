'use strict';

/*@ngInject*/
function config($routeProvider) {
  $routeProvider
    .when('/session-starter', {
      controller: 'SessionStarterCtrl as sessionStarter',
      templateUrl: 'scripts/sessionStarter/views/index.html',
      access: { requiredAuthentication: true }
    });
}

module.exports = config;
