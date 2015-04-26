'use strict';

/**
 * @ngdoc overview
 * @name uiBuilderApp
 * @description
 * # uiBuilderApp
 *
 * Main module of the application.
 */
angular
  .module('uiBuilderApp', [
    'uib-templates',
    'uiBuilderApp.modal',
    'uiBuilderApp.common',
    'uiBuilderApp.domTree',
    'uiBuilderApp.propertyEditor',
    'uiBuilderApp.Canvas',
    'uiBuilderApp.repository',
    'uiBuilderApp.htmlView'
  ]);
