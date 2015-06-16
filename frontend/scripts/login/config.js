'use strict';

/*@ngInject*/
function config($routeProvider) {
  $routeProvider
    .when('/login', {
      controller: 'LoginCtrl as login',
      templateUrl: __dirname + '/views/login.html'
    })
    .when('/registration', {
      controller: 'LoginCtrl as login',
      templateUrl: __dirname + '/views/registration.html'
    });
}

module.exports = config;
