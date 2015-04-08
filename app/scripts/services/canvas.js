'use strict';

angular.module('uiBuilderApp')
  .service('canvas', function (Repository) {

    this.iframe = null;

    this.register = function (iframe) {
      this.iframe = iframe;
      Repository.getItems().then(function (repo) {
        this.installDeps(repo.require);
      }.bind(this));
    };

    this.installDeps = function (deps) {
      var cssDeps = deps.css;
      var jsDeps = deps.js;
      if (cssDeps && cssDeps.length > 0) {
        cssDeps.forEach(this.addStyles.bind(this));
      }
      if (jsDeps && jsDeps.length > 0) {
        cssDeps.forEach(this.addJS.bind(this));
      }
    }.bind(this);

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
      style.setAttribute('type', 'text/css');
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
