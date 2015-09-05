'use strict';

/*@ngInject*/
function LoginController(LoginService) {

  this.loginData = {
    email: '',
    password: ''
  };

  this.registerData = {
    email: '',
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
