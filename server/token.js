'use strict';

var _ = require('lodash'),
    debug = require('debug')('server:token'),
    jsonwebtoken = require('jsonwebtoken'),
    redisClient = require('./redis').redisClient,
    config = require('./config');

function extractFromHeader(headers) {
  if (headers && headers.authorization) {
    var authorization = headers.authorization;

    debug('Extract token from header %s', authorization);

    var part = authorization.split(' ');
    if (part.length === 2) {
      return part[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
}

function create(user, done) {

  debug('Create a new token');

  if (_.isEmpty(user)) {
    return done(new Error('User data cannot be empty.'));
  }

  var token = jsonwebtoken.sign({ _id: user._id }, config.token.secret, {
      expiresInMinutes: config.token.exp / 60
  });

  var data = {
    _id: user._id,
    username: user.username,
    token: token
  };

  var decoded = jsonwebtoken.decode(token);
  data.token_exp = decoded.exp;
  data.token_iat = decoded.iat;

  redisClient.set(token, JSON.stringify(data), function(err, reply) {
    if (err) {
      return done(new Error(err));
    }

    if (reply) {
      redisClient.expire(token, config.token.exp, function(err, reply) {
        if (err) {
          return done(new Error('Cannot set the expire value for the token key'));
        }
        if (reply) {
          done(null, data);
        } else {
          return done(new Error('Expiration not set on Redis'));
        }
      });
    } else {
      return done(new Error('Token not set in Redis'));
    }
  });
}

function retrieve(token, done) {
  if (_.isNull(token)) {
    return done(new Error('token_invalid'));
  }

  redisClient.get(token, function (err, reply) {
    if (err) {
      return done(err);
    }

    if (_.isNull(reply)) {
      return done(new Error('Invalid token'));
    }

    var data = JSON.parse(reply);
    debug('User data fetched from Redis: ', JSON.stringify(data));
    if (_.isEqual(data.token, token)) {
      return done(null, data);
    } else {
      return done(new Error('token_doesnt_exist'));
    }

  });
}

// Middleware for token verification
function verify(headers, done) {

  debug('Token verification');

  var token = extractFromHeader(headers);

  jsonwebtoken.verify(token, config.token.secret, function(err) {
    if (err) {
      return done(new Error('invalid_token'));
    }
    retrieve(token, function(err, data) {
      if (err || !data) {
        return done(new Error('Invalid token'));
      }
      done(null, data);
    });
  });
}

function expire(headers) {
  var token = extractFromHeader(headers);

  debug('Expiring token %s', token);

  if (token !== null) {
    redisClient.expire(token, 0);
  }
  return token !== null;
}

module.exports.create = create;
module.exports.expire = expire;
module.exports.verify = verify;
module.exports.retrieve = retrieve;
module.exports.extractFromHeader = extractFromHeader;
