'use strict';

/*@ngInject*/
function Service(Storage) {
  this._id = null;

  this.isAuthenticated = function() {
    return !!this._id && Storage.get('token') !== null;
  };

  this.setLoggedIn = function(serverResponse) {
    Storage.set('token', serverResponse.data.data.token);
    this._id = serverResponse.data.data._id;
  };

  this.loggedOut = function() {
    Storage.remove('token');
    this._id = null;
  };
}

module.exports = Service;
