'use strict';

var debug = require('debug')('uib:server:routes:api'),
    R = require('ramda'),
    ws = require('../socket'),
    token = require('../token'),
    sessionDomain = require('../domain/builderSession'),
    renderer = require('../domain/renderer'),
    responce = require('../helpers/responseHandlers.js');

var sendReloadSignal = R.curry(function(res, message, data) {
  ws.broadcast('reload');
  responce.success(res, message)(data);
});

function checkTokenValidity(headers) {
  return token.verify(headers);
}

var getSessionAsset = R.curry(function(type, sessionId) {
  return sessionDomain.getSessionAsset(sessionId, type);
});

module.exports.getSessionById = function(req, res) {
  checkTokenValidity(req.headers).then(function(userData) {
    var sessionId = req.params.sessionId.trim() || '';
    debug('Try to get session by id %s', sessionId);
    return sessionDomain.getSessionsById(sessionId, userData._id);
  })
  .then(responce.success(res, 'Session has been found'))
  .catch(responce.error('Error'));
};

module.exports.getListOfSessions = function(req, res) {
  checkTokenValidity(req.headers).then(function(userData) {
    return sessionDomain.getSessionsByUserId(userData._id);
  })
  .then(responce.success(res, 'Here is your list of sessions'))
  .catch(responce.invalidToken(res));
};

module.exports.getSessionInitialsBySessionId = function(req, res) {
  return sessionDomain
  .getSessionInitialsBySessionId(req)
  .then(responce.success(res, 'Session initials are ready'))
  .catch(responce.error(res));
};

module.exports.setSessionInitialsBySessionId = function(req, res) {
  return sessionDomain
  .setSessionInitialsBySessionId(req)
  .then(responce.success(res, 'Session initials has been updated'))
  .catch(responce.error(res));
};

module.exports.startNewSession = function(req, res) {
  checkTokenValidity(req.headers).then(function(userData) {
    return sessionDomain.getNewSessionInitials(req, userData);
  })
  .spread(sessionDomain.startNew)
  .then(responce.success(res, 'New sesion started'))
  .catch(responce.error(res));
};

module.exports.updateSession = function(req, res) {
  debug('Attempt to update session');
  checkTokenValidity(req.headers).then(function(userData) {
    return sessionDomain.fetchSessionId(req).then(function(sessionId) {
      return sessionDomain.updateSession(sessionId, userData._id, req.body);
    });
  })
  .then(sendReloadSignal(res, 'The initial code was updated'))
  .catch(responce.error(res));
};

module.exports.appendSnapshotToSession = function(req, res) {
  checkTokenValidity(req.headers).then(function() {
    return sessionDomain.validateSessionSnapshotPayload(req);
  })
  .spread(sessionDomain.appendSnapshotToSession)
  .then(sendReloadSignal(res, 'A new snapshot have been appended'))
  .catch(responce.error(res));
};

module.exports.getSessionHTML = function(req, res) {
  sessionDomain
  .fetchSessionId(req)
  .then(getSessionAsset('html'))
  .then(responce.sendHTML(res))
  .catch(responce.error(res));
};

module.exports.getSessionJS = function(req, res) {
  sessionDomain
  .fetchSessionId(req)
  .then(getSessionAsset('js'))
  .then(responce.sendJS(res))
  .catch(responce.error(res));
};

module.exports.getSessionCSS = function(req, res) {
  sessionDomain
  .fetchSessionId(req)
  .then(getSessionAsset('css'))
  .then(responce.sendCSS(res))
  .catch(responce.error(res));
};

module.exports.renderSession = function(req, res) {
  debug('Get session result %s', req.params.shortId || req.params.sessionId || 'N/S');
  var sessionPromise, snapshotId = req.params.snapshotId || null;

  if (req.params.shortId) {
    sessionPromise = sessionDomain.getSessionsBySharedId(req.params.shortId);
  } else if (req.params.sessionId) {
    sessionPromise = sessionDomain.getSessionsById(req.params.sessionId);
  } else {
    debug('Session id is not specified!');
    return responce.error(res);
  }

  sessionPromise
  .then(sessionDomain.getSessionSnapshotById(snapshotId))
  .spread(renderer.renderSession)
  .then(function(resultingHTML) {
    debug('Sessions has been rendered');
    return res.status(200).set('Content-Type', 'text/html').send(resultingHTML);
  })
  .catch(responce.error(res));
};

module.exports.renderLatestsSnapshot = function(req, res) {
  var sessionId = req.params.sessionId || '';

  sessionDomain
  .getSessionsById(sessionId)
  .then(sessionDomain.getSessionSnapshotById(null))
  .spread(renderer.renderSnapshot)
  .then(function(resultingHTML) {
    debug('Got rendering result %s', resultingHTML);
    res.status(200).set('Content-Type', 'text/html').send(resultingHTML);
  })
  .catch(responce.error(res));
};
