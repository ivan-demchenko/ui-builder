'use strict';

/*@ngInject*/
function Controller(galleryItems, Behavior) {
  this.items = galleryItems;
  this.startNewSession = Behavior.session.prepare;
}

module.exports = Controller;
