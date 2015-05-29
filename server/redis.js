'use strict';

var config = require('./config'),
    Q = require('q'),
    redis = require('redis'),
    debug = require('debug')('server:redis'),
    redisClient = redis.createClient(config.redis.port, config.redis.host, config.redis.options);

if (process.env.NODE_ENV === 'dev') {
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
