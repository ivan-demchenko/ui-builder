'use strict';

/*@ngInject*/
function config($routeProvider) {
  $routeProvider
    .when('/login', {
      controller: 'LoginCtrl as login',
      templateUrl: 'scripts/login/views/login.html'
    });
}

module.exports = config;
