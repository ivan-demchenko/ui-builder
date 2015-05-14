'use strict';

/*@ngInject*/
function Controller(Behavior) {
  this.initials = {
    html: '',
    js: '',
    css: ''
  };

  this.start = function() {
    Behavior.session.startNew(this.initials);
  };
}

module.exports = Controller;
