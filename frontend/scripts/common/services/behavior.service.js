'use strict';

/*ngInject*/
function Behavior($location, User, Session) {
  this.auth = {
    login: {
      success: function(response) {
        console.log('>> login successful');
        // TODO: Show success message
        User.setLoggedIn(response);
        $location.path('/gallery');
      },
      error: function(reason) {
        console.log('>> login failed');
        // TODO: Show error message
        console.error(reason);
      }
    },

    registration: {
      success: function(response) {
        // TODO: Show success message
        console.log(response);
      },

      error: function(reason) {
        // TODO: Show error message
        console.error(reason);
      }
    },

    logout: {
      success: function(response) {
        // TODO: Show success message
        User.loggedOut();
        console.log(response);
      },

      error: function(reason) {
        // TODO: Show error message
        console.error(reason);
      }
    }
  };

  this.session = {
    prepare: function() {
      $location.path('/session-starter');
    },
    startNew: function(initialSetup) {
      Session.startNew(initialSetup);
    }
  };
}

module.exports = Behavior;
