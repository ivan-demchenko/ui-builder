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
    'uiBuilderApp.common',
    'uiBuilderApp.domTree',
    'uiBuilderApp.propertyEditor',
    'uiBuilderApp.canvas',
    'uiBuilderApp.repository'
  ]);
