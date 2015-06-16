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
    if (!this.initials.html) {
      return window.alert('Please, enter initial HTML');
    }
    Behavior.session.startNew(this.title, this.initials);
  };
}

module.exports = Controller;
