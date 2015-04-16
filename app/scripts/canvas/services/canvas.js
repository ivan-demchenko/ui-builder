'use strict';

angular.module('uiBuilderApp.canvas')
  .service('canvas', function(Repository, ElemManager, $rootScope) {

    this.iframe = null;

    this.register = function(iframe) {
      this.iframe = iframe;
      Repository.getItems().then(this.setUpIframe.bind(this));
    };

    $rootScope.$on('uib:elem:dropped', function() {
      this.refreshIframe();
    }.bind(this));

    this.refreshIframe = function() {
      var self = this;
      var repoData = Repository.getItems();

      var code = this.getIframeBody().innerHTML;

      this.iframe.src = repoData.initial.html;

      this.iframe.onload = function() {
        self.getIframeBody().innerHTML = code;
        self.addJS(repoData.initial.js);
        self.addStyles('/styles/uib-canvas.css');
        self.initEvents(self.iframe.contentDocument.documentElement.querySelector('body'));
      };

    };

    this.setUpIframe = function(repoData) {
      var self = this;
      this.iframe.src = repoData.initial.html;
      this.iframe.onload = function() {
        self.addJS(repoData.initial.js);
        self.addStyles('/styles/uib-canvas.css');
        self.initEvents(self.iframe.contentDocument.documentElement.querySelector('body'));
      };
    };

    this.initEvents = function(canvasBody) {
      canvasBody.addEventListener('drop', function(evt) {
        evt.preventDefault();
        ElemManager.dropElement(evt.target, evt.dataTransfer.getData('elementDescription'));
      });

      canvasBody.addEventListener('dragend', function(evt) {
        evt.preventDefault();
        ElemManager.unmarkTarget(evt.target);
      });

      canvasBody.addEventListener('dragover', function(evt) {
        evt.preventDefault();
        ElemManager.markTarget(evt.target);
      });

      canvasBody.addEventListener('dragleave', function(evt) {
        evt.preventDefault();
        ElemManager.unmarkTarget(evt.target);
      });
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

    this.addInilineJS = function(code) {
      var script = document.createElement('script');

      script.type = 'text/javascript';
      script.charset = 'UTF-8';
      script.innerText = code;

      this.getIframeHead().appendChild(script);
    };

  });
