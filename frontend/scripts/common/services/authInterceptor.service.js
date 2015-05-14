'use strict';

var angular = require('angular');

/*@ngInject*/
function AuthInterceptor($q, $location, Storage, User) {

  function isResponseContainsToken(response) {
    return angular.isObject(response.data) && angular.isObject(response.data.data) && angular.isString(response.data.data.token);
  }

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
      if (response !== null && response.status === 200 && !User.isAuthenticated() && isResponseContainsToken(response)) {
        User.setLoggedIn(response);
      }
      return response || $q.when(response);
    },

    responseError: function(rejection) {
      if (rejection !== null && rejection.status === 401) {
        Storage.remove('token')
        User.authenticated = false;
        $location.path('/login');
      }
      return $q.reject(rejection);
    }
  };
}

module.exports = AuthInterceptor;
