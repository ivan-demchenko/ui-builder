'use strict';

module.exports = function() {

  var modals = {};

  function register(name) {
    modals[name] = {
      state: 'CLOSED'
    };
  }

  function isOpened(name) {
    if (modals[name]) {
      return modals[name].state === 'OPENED';
    }
  }

  function toggleState(name) {
    if (modals[name]) {
      modals[name].state = modals[name].state === 'CLOSED' ? 'OPENED' : 'CLOSED';
    }
  }

  return {
    register: register,
    toggle: toggleState,
    isOpened: isOpened
  };

};
