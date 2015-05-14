'use strict';

/*@ngInject*/
function Service(Storage) {
  this.token = Storage.get('token');
  this._id = Storage.get('_id');

  this.isAuthenticated = function() {
    return !!this._id && !!this.token;
  };

  this.setLoggedIn = function(serverResponse) {
    Storage.set('token', serverResponse.data.data.token);
    Storage.set('_id', serverResponse.data.data._id);
    this.token = serverResponse.data.data.token;
    this._id = serverResponse.data.data._id;
  };

  this.loggedOut = function() {
    Storage.remove('token');
    Storage.remove('_id');
    this.token = null;
    this._id = null;
  };
}

module.exports = Service;
