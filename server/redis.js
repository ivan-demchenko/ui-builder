'use strict';

var redis = require('redis'),
    debug = require('debug')('server:redis'),
    redisClient = redis.createClient(6379);

if (process.env.NODE_ENV === 'dev') {
  redis.debug_mode = true;
}

redisClient.on('error', function (err) {
  debug('Redis error %s', err);
});

redisClient.on('connect', function () {
  debug('Redis ready');
});

exports.redis = redis;
exports.redisClient = redisClient;
