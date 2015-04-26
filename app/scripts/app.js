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
angular
  .module('uiBuilderApp', [
    require('../../.tmp/scripts/uib-templates').name,
    require('./common/modules/modal').name,
    require('./canvas').name,
    require('./common').name,
    require('./domTree').name,
    require('./propertyEditor').name,
    require('./repository').name,
    require('./htmlView').name
  ]);
