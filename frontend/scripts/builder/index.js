'use strict';

var angular = require('angular');

/**
 * @ngdoc overview
 * @name uiBuilderApp
 * @description
 * # uiBuilderApp
 *
 * Main module of the application.
 */
 module.exports = angular.module('uiBuilderApp.builder', [
    require('./canvas').name,
    require('./common').name,
    require('./domTree').name,
    require('./propertyEditor').name,
    require('./repository').name,
    require('./htmlView').name
  ])
  .config(require('./config'));
