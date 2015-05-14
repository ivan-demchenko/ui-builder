'use strict';

/*@ngInject*/
function LoginService($http, Behavior) {

  this.login = function(loginData) {
    return $http.post('auth/login', loginData).then(
      Behavior.auth.login.success,
      Behavior.auth.login.error
    );
  };

  this.register = function(registerData) {
    return $http.post('auth/register', registerData).then(
      Behavior.auth.registration.success,
      Behavior.auth.registration.error
    );
  };

  this.logout = function() {
    return $http.post('auth/logout', {}).then(
      Behavior.auth.logout.success,
      Behavior.auth.logout.error
    );
  };

}

module.exports = LoginService;
