'use strict';

/*ngInject*/
function Behavior($location, $rootScope, User, Session, Notifications) {
  this.auth = {
    login: {
      success: function(response) {
        Notifications.notify(response.data.severity, response.data.message);
        User.setLoggedIn(response);
        $location.path('/');
      },
      error: function(reason) {
        Notifications.notify(reason.data.severity, reason.data.message);
      }
    },

    registration: {
      success: function(response) {
        Notifications.notify(response.data.severity, response.data.message);
        $location.path('login');
      },

      error: function(reason) {
        Notifications.notify(reason.data.severity, reason.data.message);
      }
    },

    logout: {
      success: function(response) {
        Notifications.notify(response.data.severity, response.data.message);
        User.loggedOut();
        $location.path('/login');
      },

      error: function(reason) {
        Notifications.notify(reason.data.severity, reason.data.message);
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
      Session.fetchFullSession(id).then(function(session) {
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
