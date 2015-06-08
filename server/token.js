'use strict';

var Q = require('q'),
    _ = require('lodash'),
    debug = require('debug')('server:token'),
    jsonwebtoken = require('jsonwebtoken'),
    redisClient = require('./redis'),
    configSetup = require('./config'),
    config = configSetup(process.env.NODE_ENV || 'production');

function jwtVerify(token) {
  debug('Verify token %s', token);
  return Q.ninvoke(jsonwebtoken, 'verify', token, config.token.secret).then(function() {
    return token;
  });
}

function sign(user) {
  return Q.fcall(function() {
    var token = jsonwebtoken.sign({ _id: user._id }, config.token.secret, {
      expiresInMinutes: config.token.exp / 60
    });
    return [user, token];
  });
}

function extractFromHeader(headers) {
  return Q.promise(function(resolve, reject) {
    if (headers && headers.authorization) {
      var authorization = headers.authorization;

      debug('Extract token from header %s', authorization);

      var part = authorization.split(' ');
      if (part.length === 2) {
        return resolve(part[1]);
      }
      return reject(null);
    }
    return reject(null);
  });
}

function generateStoredData(user, token) {
  if (!token) {
    throw new Error('Error is null');
  }
  var data = {
    _id: user._id,
    username: user.username,
    token: token
  };
  var decoded = jsonwebtoken.decode(token);
  data.token_exp = decoded.exp;
  data.token_iat = decoded.iat;
  return [data, token];
}

function create(user) {
  debug('Create a new token');
  if (_.isNull(user)) {
    throw new Error('User is null');
  }
  return sign(user)
  .spread(generateStoredData)
  .spread(function(data, token) {
    return redisClient.set(token, JSON.stringify(data)).then(function() {
      return redisClient.expire(token, config.token.exp).then(function() {
        return data;
      });
    });
  });
}

function retrieve(token) {
  if (_.isNull(token)) {
    throw new Error('token_invalid');
  }
  debug('Retrieving data from Redis via token %s', token);
  return redisClient.get(token).then(function(reply) {
    debug('Got reply from Redis %s', reply);
    var data = JSON.parse(reply);
    if (data.token !== token) {
      debug('Token are not equal');
      throw new Error('Invalid token');
    }
    debug('Token are equal');
    return data;
  });
}

// Middleware for token verification
function verify(headers) {
  debug('Token verification');
  return extractFromHeader(headers).then(jwtVerify).then(retrieve);
}

function expire(token) {
  debug('Expiring token: %s', token);
  return Q.fcall(function() {
    return redisClient.expire(token, 0).then(function() {
      return redisClient.get(token).then(function(reply) {
        return _.isNull(reply) ? true : false;
      });
    });
  });
}

module.exports.create = create;
module.exports.expire = expire;
module.exports.verify = verify;
module.exports.retrieve = retrieve;
module.exports.extractFromHeader = extractFromHeader;
