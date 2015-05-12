'use strict';

/*@ngInject*/
function LoginController(LoginService) {

  this.loginData = {
    username: '',
    password: ''
  };

  this.registerData = {
    username: '',
    password: '',
    passwordConfirmation: ''
  };

  this.logUserIn = function() {
    LoginService.login(this.loginData);
  };

  this.registerNewUser = function() {
    LoginService.register(this.registerData);
  };

}

module.exports = LoginController;
