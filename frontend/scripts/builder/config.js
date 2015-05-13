'use strict';

/*@ngInject*/
function config($routeProvider) {
  $routeProvider
    .when('/builder/:sessionId', {
      controller: 'MainCtrl as main',
      templateUrl: 'scripts/common/views/index.html',
      access: { requiredAuthentication: true }
    })
    .otherwise({
      redirectTo: '/login'
    });
}

module.exports = config;
