'use strict';

/*ngInject*/
function Behavior($location, User, Session) {
  this.auth = {
    login: {
      success: function(response) {
        console.log('>> login successful');
        // TODO: Show success message
        console.info(response.data.message);
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
        console.info(response.data.message);
      },

      error: function(reason) {
        // TODO: Show error message
        console.error(reason);
      }
    },

    logout: {
      success: function(response) {
        // TODO: Show success message
        console.info(response.data.message);
        User.loggedOut();
        $location.path('/login');
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
    startNew: function(title, initialSetup) {
      Session.startNew(title, initialSetup);
    },
    continue: function(id) {
      Session.continue(id);
      $location.path('/builder/' + id);
    }
  };

  this.drop = {
    success: function(tree) {
      Session.saveSnapshot(JSON.stringify(tree));
    }
  };
}

module.exports = Behavior;
