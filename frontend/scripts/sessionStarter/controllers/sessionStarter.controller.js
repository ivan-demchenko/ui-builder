'use strict';

/*@ngInject*/
function Controller(Behavior) {
  this.title = '';
  this.initials = {
    html: '',
    js: '',
    css: ''
  };

  this.start = function() {
    Behavior.session.startNew(this.title, this.initials);
  };
}

module.exports = Controller;
