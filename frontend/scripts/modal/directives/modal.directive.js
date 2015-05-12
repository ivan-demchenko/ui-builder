'use strict';

var Elem = require('../common.dir.js');

/*@ngInject*/
function ModalDirective(Modal) {
  return new Elem('scripts/modal/templates/modal.html', true, function(scope, elem, attrs) {

    if (!attrs.name) {
      throw new Error('Name attribute is missing for the modal');
    }

    scope.$on('uib:modal:close', function() {
      Modal.toggle(attrs.name);
    });

    Modal.register(attrs.name);

    scope.getClass = function() {
      return Modal.isOpened(attrs.name) ? '' : 'uib-modal--hidden';
    };

  });
}

/*@ngInject*/
function HeaderDirective() {
  return new Elem('scripts/modal/templates/header.html', true, function(scope, elem, attrs) {
    attrs.$observe('label', function(newVal) {
      elem[0].querySelector('.uib-modal__header__label h3').innerText = newVal;
    });
    attrs.$observe('subLabel', function(newVal) {
      elem[0].querySelector('.uib-modal__header__label h5').innerText = newVal;
    });
    scope.closeThisModal = function() {
      scope.$emit('uib:modal:close');
    };
  });
}

/*@ngInject*/
function ContentDirective() {
  return new Elem('scripts/modal/templates/content.html');
}

module.exports = {
  modal: ModalDirective,
  header: HeaderDirective,
  content: ContentDirective
};
