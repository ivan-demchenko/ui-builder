'use strict';

var Q = require('q'),
    R = require('ramda'),
    debug = require('debug')('uib:server:token'),
    jsonwebtoken = require('jsonwebtoken'),
    redisClient = require('./redis'),
    configSetup = require('../config'),
    config = configSetup(process.env.NODE_ENV || 'production');

function jwtVerify(token) {
  debug('Verify token %s', token);
  return Q.ninvoke(jsonwebtoken, 'verify', token, config.token.secret).then(function() {
    return token;
  });
}

function sign(user) {
  debug('Signing with JWT');
  return Q.fcall(function() {
    var token = jsonwebtoken.sign({ _id: user._id }, config.token.secret, {
      expiresIn: config.token.exp
    });
    return [user, token];
  });
}

function extractFromHeader(headers) {
  return Q.promise(function(resolve, reject) {
    if (!headers || !headers.authorization) {
      return reject(new Error('Authorization header has not been provided'));
    }
    var authorization = headers.authorization;

    debug('Extract token from header %s', authorization);

    var part = authorization.split(' ');

    if (part.length !== 2) {
      return reject(new Error('Authorization header is corrupted'));
    }

    return resolve(part[1]);
  });
}

function generateStoredData(user, token) {
  if (!token) {
    throw new Error('Token has not been provided');
  }

  debug('Generating user-token data to store');

  var data = {
    _id: user._id,
    email: user.email,
    token: token
  };
  var decoded = jsonwebtoken.decode(token);
  data.token_exp = decoded.exp;
  data.token_iat = decoded.iat;
  return [data, token];
}

function create(user) {
  if (R.isNil(user)) {
    throw new Error('User data has not beed provided');
  }
  debug('Create a new token for the user');
  return sign(user)
  .spread(generateStoredData)
  .spread(function(data, token) {
    debug('Received token and data to be stored');
    return redisClient.set(token, JSON.stringify(data)).then(function() {
      return redisClient.expire(token, config.token.exp).then(function() {
        return data;
      });
    });
  });
}

function retrieve(token) {
  if (R.isNil(token)) {
    throw new Error('Your access token is outdated, you need to relogin.');
  }
  debug('Retrieving data from Redis via token %s', token);
  return redisClient.get(token).then(function(reply) {
    var data;
    debug('Got reply from Redis %s', reply);
    try {
      data = JSON.parse(reply);
    } catch (e) {
      throw new Error('Error happened while checking token');
    }
    if (data.token !== token) {
      debug('Tokens are not equal');
      throw new Error('Your access token is invalid. Please, relogin');
    }
    debug('Tokens are equal, yours one is fine');
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
  return redisClient.expire(token, 0).then(function() {
    return redisClient.get(token).then(R.isNil);
  });
}

module.exports.create = create;
module.exports.expire = expire;
module.exports.verify = verify;
module.exports.retrieve = retrieve;
module.exports.extractFromHeader = extractFromHeader;
