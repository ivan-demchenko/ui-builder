'use strict';

angular.module('uiBuilderApp')
  .service('iframeContent', function () {

    this.getIframeBody = function (iframeElem) {
      var iDoc = iframeElem.contentWindow || iframeElem.contentDocument;
      if (iDoc.document) {
        iDoc = iDoc.document;
        return iDoc.body;
      } else {
        return null;
      }
    };

  });
