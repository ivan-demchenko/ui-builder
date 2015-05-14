'use strict';

var angular = require('angular');

module.exports = angular.module('uiBuilderApp.header', [])
  .controller('HeaderCtrl', require('./controllers/header.controller'));
