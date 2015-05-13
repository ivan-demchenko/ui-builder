'use strict';

/*@ngInject*/
function AuthInterceptor($q, $location, Storage, User) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if (Storage.get('token')) {
          config.headers.Authorization = 'Bearer ' + Storage.get('token');
      }
      return config;
    },

    requestError: function(rejection) {
      return $q.reject(rejection);
    },

    response: function(response) {
      if (response !== null && response.status === 200 && !Storage.get('token') && !User.authenticated) {
        User.setLoggedIn(response);
      }
      return response || $q.when(response);
    },

    responseError: function(rejection) {
      if (rejection !== null && rejection.status === 401 && (Storage.get('token') || User.authenticated)) {
        Storage.remove('token')
        User.authenticated = false;
        $location.path('/login');
      }
      return $q.reject(rejection);
    }
  };
}

module.exports = AuthInterceptor;
