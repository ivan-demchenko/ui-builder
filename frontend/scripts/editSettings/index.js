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
module.exports = angular.module('uiBuilderApp.editSettings', [])
.controller('EditSettingsCtrl', require('./controllers/edit-settings.controller'))
.config(require('./config'));
