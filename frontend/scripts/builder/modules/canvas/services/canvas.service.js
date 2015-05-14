'use strict';

function preventDefault(evt) {
  evt.preventDefault();
}

function toggleHighlightElement(evt, isActive) {
  evt.target.classList[isActive ? 'add' : 'remove']('uib-drag-over');
  return evt.target;
}

function setHighlight(evt) {
  return toggleHighlightElement(evt, true);
}

function removeHighlight(evt) {
  return toggleHighlightElement(evt, false);
}

function dropped(evt, ElemManager) {
  var target = removeHighlight(evt);
  var elemDescription = evt.dataTransfer.getData('elementDescription');
  ElemManager.dropElement(target, elemDescription);
}

/*@ngInject*/
function CanvasService($rootScope, Repository, ElemManager, Common, Session) {

  this.iframe = null;
  this.shadow = null;

  this.register = function(container) {
    this.iframe = container.find('iframe')[0];
    this.iframe.src = Session.getCurrentSessionUrl();
    this.shadow = container.find('div')[0];
    Repository.getItems().then(function(repoData) {
      this.setUpCanvas('', repoData, true);
    }.bind(this));
  };

  this.setUpCanvas = function(newHTML, repoData, initial) {
    this.getIframeBody().innerHTML = newHTML;
    this.addJS(repoData.initial.js);
    this.addStyles('/styles/uib-canvas.css');
    this.bindEventHandlers();
    if (!initial) {
      $rootScope.$emit('uib:canvas:updated', this.shadow);
    }
  };

  this.reloadIFrame = function() {
    var oldCode = this.shadow.innerHTML;
    Repository.getItems().then(function(repoData) {
      this.iframe.src = repoData.initial.html;
      this.iframe.onload = function() {
        this.setUpCanvas(oldCode, repoData);
      }.bind(this);
    }.bind(this));

  };

  this.updateShadow = function(parent, dropppedElement) {
    parent = (parent.tagName === 'BODY') ?
              this.shadow :
              this.shadow.querySelector(Common.domPath(dropppedElement));
    var clone = ElemManager.cloneElement(dropppedElement);
    parent.appendChild(clone);
  };

  this.elementDropped = function(dropppedElement, target) {
    if (!Common.hasParent(target, 'uib-canvas-shadow')) {
      this.updateShadow(target, dropppedElement);
    }
    this.reloadIFrame();
  };

  this.removeElement = function(element) {
    element.remove();
    this.reloadIFrame();
  };

  this.getIframeHead = function() {
    if (!this.iframe) {
      throw 'IFrame is not registered';
    }
    var iDoc = this.iframe.contentWindow || this.iframe.contentDocument;
    return iDoc.document ? iDoc.document.head : null;
  };

  this.getIframeBody = function() {
    if (!this.iframe) {
      throw 'IFrame is not registered';
    }
    var iDoc = this.iframe.contentWindow || this.iframe.contentDocument;
    return iDoc.document ? iDoc.document.body : null;
  };

  this.getSourceCode = function() {
    return this.shadow.innerHTML;
  };

  this.addStyles = function(url) {
    if (!this.iframe) {
      throw 'IFrame is not registered';
    }
    var timestamp = +(new Date());
    var style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('type', 'text/css');
    style.setAttribute('href', url + '?' + timestamp);

    this.getIframeHead().appendChild(style);
  };

  this.addJS = function(url) {
    var timestamp = +(new Date());
    var script = document.createElement('script');

    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.setAttribute('src', url + '?' + timestamp);

    this.getIframeHead().appendChild(script);
  };

  this.bindEventHandlers = function() {
    this.getIframeBody().addEventListener('dragover', preventDefault);
    this.getIframeBody().addEventListener('dragenter', setHighlight);
    this.getIframeBody().addEventListener('dragend', removeHighlight);
    this.getIframeBody().addEventListener('dragleave', removeHighlight);
    this.getIframeBody().addEventListener('drop', function(e) {
      dropped(e, ElemManager);
    });
  };

}

module.exports = CanvasService;
