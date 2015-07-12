'use strict';

/*@ngInject*/
function fetchSessionInitials($route, Session) {
  return Session.fetchSessionInitials($route.current.params.sessionId);
}

/*@ngInject*/
function config($routeProvider) {
  $routeProvider
    .when('/edit-settings/:sessionId', {
      controller: 'EditSettingsCtrl as editSettingsCtrl',
      templateUrl: __dirname + '/views/index.html',
      access: { requiredAuthentication: false },
      resolve: {
        sessionInitials: fetchSessionInitials
      }
    });
}

module.exports = config;
