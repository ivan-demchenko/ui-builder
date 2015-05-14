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
 module.exports = angular.module('uiBuilderApp.sessionStarter', [])
  .controller('SessionStarterCtrl', require('./controllers/sessionStarter.controller'))
  .config(require('./config'));
