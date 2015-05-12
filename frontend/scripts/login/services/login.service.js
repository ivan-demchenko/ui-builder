'use strict';

/*@ngInject*/
function LoginService($http, $location, User) {

  this.login = function(loginData) {
    return $http.post('auth/login', loginData).then(function(resp) {
      User.setLoggedIn(resp);
      return $http.get('/api/session/new').then(function(resp) {
        return $location.path('builder/' + resp.data.data.sessionId);
      });
    });
  };

  this.register = function(registerData) {
    return $http.post('auth/register', registerData).then(function(resp) {
      console.log(resp);
    });
  };

  this.logout = function() {
    return $http.post('auth/logout', {}).then(function() {
      User.loggedOut();
    });
  };

}

module.exports = LoginService;
