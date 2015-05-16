'use strict';

/*@ngInject*/
function CanvasService($rootScope, Repository, ResultTree, Common, Session) {

  this.iframe = null;
  this.shadow = null;

  this.register = function(container) {
    this.iframe = container.find('iframe')[0];
    this.shadow = container.find('div')[0];
    Session.getLatestSnapshot().then(function(code) {
      this.setShadowCode(code);
      this.redrawIFrame(code);
    }.bind(this));
  };

  this.setUpCanvas = function() {
    this.addJS(Session.getCurrentSessionAssetUrl('js'));
    this.addStyles(Session.getCurrentSessionAssetUrl('css'));
    this.addStyles('/styles/uib-canvas.css');
    $rootScope.$emit('uib:canvas:updated', this.shadow);
  };

  this.redrawIFrame = function(code) {
    this.iframe.src = Session.getCurrentSessionInitHTMLUrl();
    this.iframe.onload = function() {
      this.getIframeBody().innerHTML = code;
      this.setUpCanvas();
    }.bind(this);
  };

  this.saveSnapshot = function() {
    var code = this.getSourceCode();
    Session.saveSnapshot(code).then(function() {
      this.redrawIFrame(code);
    }.bind(this));
  };

  this.removeElement = function(element) {
    element.remove();
    this.saveSnapshot();
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
    return ResultTree.getDoctype(this.iframe.contentDocument) + this.iframe.contentWindow.document.documentElement.outerHTML;
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

}

module.exports = CanvasService;
