'use strict';

/*@ngInject*/
function Controller($route, sessionInitials, Session) {

  this.sessionInitials = sessionInitials;

  this.updateSession = function() {
    Session
    .updateSessionInitials(this.sessionInitials, $route.current.params.sessionId)
    .then(function() {
      window.alert('Session has been updated!');
    }).catch(function() {
      window.alert('Error while Session update!');
    });
  };

}

module.exports = Controller;
