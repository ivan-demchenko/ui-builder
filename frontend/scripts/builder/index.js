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
  require('./modules/repository').name,
  require('./modules/resultTree').name,
  require('./modules/propertyEditor').name,
  require('./modules/workbench').name
])
.controller('BuilderCtrl', require('./controllers/builder.controller'))
.config(require('./config'));
