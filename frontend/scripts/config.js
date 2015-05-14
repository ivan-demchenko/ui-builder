'use strict';

/*@ngInject*/
function globalConfig($locationProvider, $httpProvider, $routeProvider) {
  $locationProvider.html5Mode(true);
  $httpProvider.interceptors.push('AuthInterceptor');
  $routeProvider.otherwise({
    redirectTo: '/login'
  });
}

module.exports = globalConfig;
