'use strict';

var Q = require('q'),
    redis = require('redis'),
    debug = require('debug')('server:redis'),
    env = process.env.NODE_ENV || 'production',
    config = require('./config')(env),
    redisClient = redis.createClient(config.redis.port, config.redis.host, config.redis.options);

if (env === 'dev') {
  redis.debug_mode = true;
}

redisClient.on('error', function(err) {
  debug('Redis error %s', err);
});

redisClient.on('connect', function() {
  debug('Redis ready');
});

module.exports.redis = redis;
module.exports.get = Q.nbind(redisClient.get, redisClient);
module.exports.set = Q.nbind(redisClient.set, redisClient);
module.exports.expire = Q.nbind(redisClient.expire, redisClient);
