'use strict';

var angular = require('angular'),
    _ = require('lodash');

function stopEvent(evt) {
  evt.preventDefault();
  evt.stopPropagation();
}

function getMouseTarget(evt, Common) {
  var target = evt.target;
  if (Common.hasParent(target, 'uib-tree__item')) {
    return Common.getParent(target, 'uib-tree__item');
  }
  return target;
}

function getDropTarget(evt, Common) {
  var target = getMouseTarget(evt, Common);
  if (target.classList.contains('uib-tree__item')) {
    return angular.element(target).scope().node.domElem;
  }
  return target;
}

function toggleMarkDropTarget(evt, Common, needToMark) {
  stopEvent(evt);
  var target = getMouseTarget(evt, Common);
  if (needToMark) {
    return target.classList.add('uib-drag-over');
  } else {
    return target.classList.remove('uib-drag-over');
  }
}

/*@ngInject*/
function dragDropHandlerService($rootScope, Common, ElemManager) {

  this.bindEventHandlers = function(element) {
    element.addEventListener('dragover', _.partial(toggleMarkDropTarget, _, Common, true));

    element.addEventListener('dragend', _.partial(toggleMarkDropTarget, _, Common, false));

    element.addEventListener('dragleave', _.partial(toggleMarkDropTarget, _, Common, false));

    element.addEventListener('drop', function _dropHandler(evt) {
      var target = getDropTarget(evt, Common);
      target.classList.remove('uib-drag-over');
      var elemDescription = evt.dataTransfer.getData('elementDescription');
      ElemManager.dropElement(target, elemDescription);
    });
  };

}

module.exports = dragDropHandlerService;
