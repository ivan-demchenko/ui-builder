'use strict';

var _ = require('lodash'),
    env = process.env.NODE_ENV;

module.exports = _.extend(
    require('./config/general'),
    require('./config/' + env) || {});
