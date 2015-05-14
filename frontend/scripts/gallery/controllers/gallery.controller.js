'use strict';

/*@ngInject*/
function Controller(galleryItems, Behavior) {
  this.items = galleryItems;
  this.startNewSession = Behavior.session.prepare;
  this.continue = Behavior.session.continue;
}

module.exports = Controller;
