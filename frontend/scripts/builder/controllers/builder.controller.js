'use strict';

/*@ngInject*/
function Controller(repository, Modal) {

  this.repoItems = repository;
  this.domTree = {};

  this.toggleSourceView = function() {
    Modal.toggle('html-view');
  };

}

module.exports = Controller;
