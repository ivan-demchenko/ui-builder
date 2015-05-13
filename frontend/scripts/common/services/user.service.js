'use strict';

/*@ngInject*/
function Service(Storage) {
  this._id = null;

  this.authenticated = false;

  this.setLoggedIn = function(serverResponce) {
    Storage.set('token', serverResponce.data.data.token);
    this._id = serverResponce.data.data._id;
  };

  this.loggedOut = function() {
    Storage.remove('token');
    this.data = null;
  };
}

module.exports = Service;
