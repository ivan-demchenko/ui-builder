'use strict';

var angular = require('angular');

module.exports = angular.module('uiBuilderApp.login', [])
  .controller('LoginCtrl', require('./controllers/login.controller'))
  .service('LoginService', require('./services/login.service'))
  .config(require('./config'));
