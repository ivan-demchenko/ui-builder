'use strict';

var R = require('ramda');

module.exports = function(env) {
  return R.mergeAll([
    require('./common'),
    require('./' + env) || {}
  ]);
};
