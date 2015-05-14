'use strict';

// function preventDefault(evt) {
//   evt.preventDefault();
// }
//
// function toggleHighlightElement(evt, isActive) {
//   evt.target.classList[isActive ? 'add' : 'remove']('uib-drag-over');
//   return evt.target;
// }
//
// function setHighlight(evt) {
//   return toggleHighlightElement(evt, true);
// }
//
// function removeHighlight(evt) {
//   return toggleHighlightElement(evt, false);
// }
//
// function dropped(evt, ElemManager) {
//   var target = removeHighlight(evt);
//   var elemDescription = evt.dataTransfer.getData('elementDescription');
//   ElemManager.dropElement(target, elemDescription);
// }

/*@ngInject*/
function CanvasService($rootScope, Repository, ElemManager, Common, Session) {

  this.iframe = null;
  this.shadow = null;

  this.register = function(container) {
    this.iframe = container.find('iframe')[0];
    this.shadow = container.find('div')[0];
    Session.getLatestSnapshot().then(function(code) {
      this.setShadowCode(code);
      this.reloadIFrame(code);
    }.bind(this));
  };

  this.setUpCanvas = function() {
    this.addJS(Session.getCurrentSessionAssetUrl('js'));
    this.addStyles(Session.getCurrentSessionAssetUrl('css'));
    this.addStyles('/styles/uib-canvas.css');
    //this.bindEventHandlers();
    $rootScope.$emit('uib:canvas:updated', this.shadow);
  };

  this.reloadIFrame = function(code) {
    this.iframe.src = Session.getCurrentSessionInitHTMLUrl();
    this.iframe.onload = function() {
      this.getIframeBody().innerHTML = code;
      this.setUpCanvas();
    }.bind(this);
  };

  this.elementDropped = function(dropppedElement, target) {
    var code = this.getSourceCode();
    Session.saveSnapshot(code).then(function() {
      this.reloadIFrame(code);
    }.bind(this));

    // var clone = null;
    // if (!Common.hasParent(target, 'uib-canvas-shadow')) {
    //   clone = ElemManager.cloneElement(dropppedElement);
    //   this.shadow.appendChild(clone);
    //   var code = this.getSourceCode();
    //   Session.saveSnapshot(code).then(function() {
    //     this.reloadIFrame(code);
    //   }.bind(this));
    // }
  };

  this.removeElement = function(element) {
    element.remove();
    var code = this.getSourceCode();
    return Session.saveSnapshot(code).then(function() {
      this.reloadIFrame(code);
    }.bind(this));
  };

  this.elementEditFinished = function() {
    var code = this.getSourceCode();
    return Session.saveSnapshot(code).then(function() {
      this.reloadIFrame(code);
    }.bind(this));
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

  this.getFullSourceCode = function() {
    return ElemManager.getDoctype(this.iframe.contentDocument) + this.iframe.contentWindow.document.documentElement.outerHTML;
  };

  this.setShadowCode = function(code) {
    this.shadow.innerHTML = code;
  };

  this.getSourceCode = function() {
    return this.shadow.innerHTML;
  };

  this.addStyles = function(url) {
    if (!this.iframe) {
      throw 'IFrame is not registered';
    }
    var style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('type', 'text/css');
    style.setAttribute('href', url);

    this.getIframeHead().appendChild(style);
  };

  this.addJS = function(url) {
    var script = document.createElement('script');

    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.setAttribute('src', url);

    this.getIframeHead().appendChild(script);
  };

  // this.bindEventHandlers = function() {
  //   this.getIframeBody().addEventListener('dragover', preventDefault);
  //   this.getIframeBody().addEventListener('dragenter', setHighlight);
  //   this.getIframeBody().addEventListener('dragend', removeHighlight);
  //   this.getIframeBody().addEventListener('dragleave', removeHighlight);
  //   this.getIframeBody().addEventListener('drop', function(e) {
  //     dropped(e, ElemManager);
  //   });
  // };

}

module.exports = CanvasService;
