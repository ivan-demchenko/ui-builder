'use strict';

module.exports = ['$rootScope', 'Common', 'ElemManager',
function($rootScope, Common, ElemManager) {

  this.bindEventHandlers = function(element) {
    element.addEventListener('dragover', function _dravOverHandler(evt) {
      var target;

      evt.preventDefault();
      evt.stopPropagation();

      if (Common.hasParent(evt.target, 'uib-tree__item')) {
        target = Common.getParent(evt.target, 'uib-tree__item');
        target.classList.add('uib-drag-over');
      }
    });

    element.addEventListener('dragend', function _dravEndHandler(evt) {
      var target;

      evt.preventDefault();
      evt.stopPropagation();

      if (Common.hasParent(evt.target, 'uib-tree__item')) {
        target = Common.getParent(evt.target, 'uib-tree__item');
        target.classList.remove('uib-drag-over');
      }
    });

    element.addEventListener('dragleave', function _dravLeaveHandler(evt) {
      var target;

      evt.preventDefault();
      evt.stopPropagation();

      if (Common.hasParent(evt.target, 'uib-tree__item')) {
        target = Common.getParent(evt.target, 'uib-tree__item');
        target.classList.remove('uib-drag-over');
      }
    });

    element.addEventListener('drop', function _dropHandler(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      var target = evt.target;
      var elemDescription = evt.dataTransfer.getData('elementDescription');
      if (Common.hasParent(target, 'uib-tree__item')) {
        target = Common.getParent(target, 'uib-tree__item');
        target = angular.element(target).scope().node.domElem;
        target.classList.remove('uib-drag-over');
      }
      ElemManager.dropElement(target, elemDescription);
    });
  };

}];
