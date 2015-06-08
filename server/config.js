'use strict';

var _ = require('lodash');

module.exports = function(env) {
  return _.merge(
    require('./config/general'),
    require('./config/' + env) || {});
};
