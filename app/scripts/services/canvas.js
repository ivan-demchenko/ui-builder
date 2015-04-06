'use strict';

angular.module('uiBuilderApp')
  .service('canvas', function () {

    this.iframe = null;

    this.register = function (iframe) {
      this.iframe = iframe;
    };

    this.getSource = function () {
      if (!this.iframe) {
        throw 'IFrame is not registered';
      }
      return this.getIframeBody().innerHTML;
    };

    this.getIframeHead = function () {
      if (!this.iframe) {
        throw 'IFrame is not registered';
      }
      var iDoc = this.iframe.contentWindow || this.iframe.contentDocument;
      return iDoc.document ? iDoc.document.head : null;
    };

    this.getIframeBody = function () {
      if (!this.iframe) {
        throw 'IFrame is not registered';
      }
      var iDoc = this.iframe.contentWindow || this.iframe.contentDocument;
      return iDoc.document ? iDoc.document.body : null;
    };

    this.addStyles = function (url) {
      if (!this.iframe) {
        throw 'IFrame is not registered';
      }
      var timestamp = +(new Date());
      var style = document.createElement('link');
      style.setAttribute('rel', 'stylesheet');
      style.setAttribute('href', url + '?' + timestamp);

      this.getIframeHead().appendChild(style);
    };

    this.addJS = function (url) {
      var timestamp = +(new Date());
      var script = document.createElement('script');
      script.setAttribute('src', url + '?' + timestamp);

      this.getIframeHead().appendChild(script);
    };

  });
