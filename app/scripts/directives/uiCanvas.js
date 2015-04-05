'use strict';

angular.module('uiBuilderApp')
  .directive('uiCanvas', function (itemProcess, $compile, $rootScope) {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="uib-app-canvas"></div>',
      link: function (scope, elem) {

        $rootScope.$on('uib:elem:edit:done', function (evt, elem) {
          itemProcess.resetAttrsForElement(elem);
        });

        $rootScope.$on('uib:elem:remove', function (evt, elem) {
          elem.remove();
        });

        elem.on('dblclick', function (evt) {
          evt.preventDefault();
          if (evt.target.uibRemovable) {
            $rootScope.$emit('uib:elem:edit', evt.target);
          }
        });

        elem.on('drop', function (evt) {
          evt.preventDefault();
          var target = angular.element(evt.target);
          var elemModel = JSON.parse(evt.dataTransfer.getData('elemModel'));
          var insElem = itemProcess.buildElementToDrop(elemModel);
          target.removeClass('drag').append(insElem);
          $rootScope.$emit('uib:elem:dropped', insElem);
        });

        elem.on('dragend', function (evt) {
          evt.preventDefault();
          evt.target.classList.remove('drag');
        });

        elem.on('dragover', function (evt) {
          evt.preventDefault();
          evt.target.classList.add('drag');
        });

        elem.on('dragleave', function (evt) {
          evt.preventDefault();
          evt.target.classList.remove('drag');
        });

      }
    };
  });
