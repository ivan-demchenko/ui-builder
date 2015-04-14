'use strict';

angular.module('uiBuilderApp')
  .service('canvas', function(Repository) {

    this.iframe = null;

    this.register = function(iframe) {
      this.iframe = iframe;
      Repository.getItems().then(this.installDeps.bind(this));
    };

    this.reinitialize = function() {
      var iDoc = (this.iframe.contentWindow || this.iframe.contentDocument).document;
      var evt = iDoc.createEvent('Event');
      evt.initEvent('load', false, false);
      iDoc.dispatchEvent(evt);
    };

    this.installDeps = function(repoData) {
      var cssDeps = repoData.require.css;
      var jsDeps = repoData.require.js;
      if (cssDeps && cssDeps.length > 0) {
        cssDeps.forEach(this.addStyles.bind(this));
      }
      if (jsDeps && jsDeps.length > 0) {
        jsDeps.forEach(this.addJS.bind(this));
      }
    };

    this.getSource = function() {
      if (!this.iframe) {
        throw 'IFrame is not registered';
      }
      return this.getIframeBody().innerHTML;
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

  });
