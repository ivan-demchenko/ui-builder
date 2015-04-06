'use strict';

angular.module('uiBuilderApp')
  .directive('uiCanvas', function (dropProcess, $compile, $rootScope) {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="uib-app-canvas"></div>',
      link: function (scope, elem) {

        $rootScope.$on('uib:elem:edit:done', function (evt, elem) {
          dropProcess.resetAttrsForElement(elem);
        });

        $rootScope.$on('uib:elem:remove', function (evt, elem) {
          dropProcess.removeElem(elem);
        });

        elem.on('dblclick', function (evt) {
          evt.preventDefault();
          dropProcess.startEditElem(evt.target);
        });

        elem.on('drop', function (evt) {
          evt.preventDefault();
          dropProcess.dropElement(evt.target, evt.dataTransfer.getData('elemModel'));
        });

        elem.on('dragend', function (evt) {
          evt.preventDefault();
          dropProcess.unmarkTarget(evt.target);
        });

        elem.on('dragover', function (evt) {
          evt.preventDefault();
          dropProcess.markTarget(evt.target);
        });

        elem.on('dragleave', function (evt) {
          evt.preventDefault();
          dropProcess.unmarkTarget(evt.target);
        });

      }
    };
  });
