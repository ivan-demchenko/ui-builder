'use strict';

/*@ngInject*/
function HeaderController(User, LoginService) {
  this.isUserAuthenticated = function() {
    return User.isAuthenticated();
  };

  this.logout = function() {
    LoginService.logout();
  };
}

module.exports = HeaderController;
