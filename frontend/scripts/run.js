'use strict';

/*@ngInject*/
function Run($rootScope, $location, Storage, User) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute) {
    //redirect only if both isAuthenticated is false and no token is set
    if (nextRoute &&
        nextRoute.access &&
        nextRoute.access.requiredAuthentication &&
        !User.authenticated &&
        !Storage.get('token')) {
          $location.path('/login');
        }
  });
}

module.exports = Run;
