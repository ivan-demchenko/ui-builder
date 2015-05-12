'use strict';

/*@ngInject*/
function Service(Storage) {
  this.data = null;

  this.authenticated = false;

  this.setLoggedIn = function(serverResponce) {
    Storage.set('token', serverResponce.data.data.token);
    this.data = serverResponce.data.data.user;
  };

  this.loggedOut = function() {
    Storage.remove('token');
    this.data = null;
  };
}

module.exports = Service;
