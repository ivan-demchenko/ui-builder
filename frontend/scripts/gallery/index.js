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
 module.exports = angular.module('uiBuilderApp.gallery', [])
  .controller('GalleryCtrl', require('./controllers/gallery.controller'))
  .service('Gallery', require('./services/gallery.service'))
  .config(require('./config'));
