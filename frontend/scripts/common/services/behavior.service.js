'use strict';

/*ngInject*/
function Behavior($location, $rootScope, User, Session) {
  this.auth = {
    login: {
      success: function(response) {
        console.log('>> login successful');
        // TODO: Show success message
        console.info(response.data.message);
        User.setLoggedIn(response);
        $location.path('/');
      },
      error: function(reason) {
        console.log('>> login failed');
        // TODO: Show error message
        console.error(reason);
      }
    },

    registration: {
      success: function(response) {
        window.alert(response.data.message);
        $location.path('login');
      },

      error: function(reason) {
        window.alert(reason.data.message);
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
      Session.fetchSession(id).then(function(session) {
        $location.path('/builder/' + session._id);
      });
    }
  };

  this.resultTree = {
    modified: function(tree) {
      if (tree) {
        Session.saveSnapshot(JSON.stringify(tree));
      }
    }
  };

  this.builder = {
    turnOff: function() {
      Session.dropSession();
    }
  };
}

module.exports = Behavior;
