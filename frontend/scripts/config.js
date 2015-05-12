'use strict';

/*@ngInject*/
function globalConfig($locationProvider, $httpProvider) {
  $locationProvider.html5Mode(true);
  $httpProvider.interceptors.push('AuthInterceptor');
}

module.exports = globalConfig;
