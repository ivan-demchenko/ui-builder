'use strict';

angular.module('uiBuilderApp')
  .directive('uiCanvas', function () {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="ui-canvas"></div>',
      link: function (scope, elem) {
        elem.on('drop', function (evt) {
          evt.preventDefault();
          var target = evt.target;
          var html = evt.dataTransfer.getData('markup');
          target.classList.remove('drag');
          target.insertAdjacentHTML('beforeEnd', html);
        });
        elem.on('dragend', function (evt) {
          evt.preventDefault();
          elem[0].classList.remove('drag');
        });
        elem.on('dragover', function (evt) {
          evt.preventDefault();
          elem[0].classList.add('drag');
        });
        elem.on('dragleave', function (evt) {
          evt.preventDefault();
          elem[0].classList.remove('drag');
        });
      }
    };
  });
