'use strict';

var debug = require('debug')('uib:server:mongo'),
    mongoose = require('mongoose');

module.exports.setUp = function(env, config) {
  if (env === 'development') {
    mongoose.set('debug', true);
  }

  mongoose.connect(config.mongo.host, config.mongo.options, function(err) {
    if (err) {
        debug('Connection refused to %s', config.mongo.host);
        debug(err);
    } else {
        debug('Connection successful to %s', config.mongo.host);
    }
  });
};
