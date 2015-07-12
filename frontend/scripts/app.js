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
angular.module('uiBuilderApp', [
    require('angular-route'),
    require('../../.tmp/scripts/uib-templates').name,
    require('./header').name,
    require('./editSettings/').name,
    require('./gallery').name,
    require('./sessionStarter').name,
    require('./common').name,
    require('./login').name,
    require('./builder').name
  ])
  .config(require('./config'))
  .run(require('./run'));
