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
 module.exports = angular.module('uiBuilderApp.builder', [])
  .controller('MainCtrl', require('./controllers/main.controller'))
  .config(require('./config'));
