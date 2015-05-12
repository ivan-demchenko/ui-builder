'use strict';

var angular = require('angular');

module.exports = angular.module('uiBuilderApp.common', [])
  .factory('AuthInterceptor', require('./services/authInterceptor.service'))
  .service('Storage', require('./services/storage.service'))
  .service('User', require('./services/user.service'));
