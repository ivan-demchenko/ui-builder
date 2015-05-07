'use strict';

var angular = require('angular'),
    _ = require('lodash');

function stopEvent(evt) {
  evt.preventDefault();
  evt.stopPropagation();
}

function getHightlightTarget(evt, Common) {
  var target = evt.target;
  if (Common.hasParent(target, 'uib-tree__item')) {
    return Common.getParent(target, 'uib-tree__item');
  }
  return target;
}

function getDropTarget(evt, Common) {
  var target = getHightlightTarget(evt, Common);
  if (target.classList.contains('uib-tree__item')) {
    return angular.element(target).scope().node.domElem;
  }
  return target;
}

function toggleHighlightElement(evt, Common, isActive) {
  getHightlightTarget(evt, Common).classList[isActive ? 'add' : 'remove']('uib-drag-over');
}

function setHighlight(evt, throttledMarker) {
  stopEvent(evt);
  throttledMarker(evt);
}

function removeHighlight(evt, throttledMarker, Common) {
  throttledMarker.cancel();
  toggleHighlightElement(evt, Common, false);
}

function dropped(evt, throttledMarker, Common, ElemManager) {
  removeHighlight(evt, throttledMarker, Common);
  var target = getDropTarget(evt, Common);
  var elemDescription = evt.dataTransfer.getData('elementDescription');
  ElemManager.dropElement(target, elemDescription);
}

/*@ngInject*/
function dragDropHandlerService($rootScope, Common, ElemManager) {

  var throttledMarker = _.throttle(_.partial(toggleHighlightElement, _, Common, true), 333);

  this.bindEventHandlers = function(element) {
    element.addEventListener('dragover', _.partial(setHighlight, _, throttledMarker));
    element.addEventListener('dragend', _.partial(removeHighlight, _, throttledMarker, Common));
    element.addEventListener('dragleave', _.partial(removeHighlight, _, throttledMarker, Common));
    element.addEventListener('drop', _.partial(dropped, _, throttledMarker, Common, ElemManager));
  };

}

module.exports = dragDropHandlerService;
