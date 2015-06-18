'use strict';

var debug = require('debug')('server:routes:api'),
    ws = require('../socket'),
    token = require('../token'),
    sessionDomain = require('../domain/builderSession'),
    renderer = require('../domain/renderer'),
    responce = require('../helpers/responseHandlers.js');

function sendReloadSignal(res, message) {
  return function(data) {
    ws.broadcast('reload');
    responce.success(res, message)(data);
  };
}

module.exports.getSessionById = function(req, res) {
  token
  .verify(req.headers)
  .then(function(userData) {
    var sessionId = req.params.sessionId.trim() || '';
    debug('Try to get session by id %s', sessionId);
    sessionDomain.getSessionsById(sessionId, userData._id)
    .then(
      responce.success(res, 'Session has been found'),
      responce.error(res)
    )
    .catch(responce.error(res));
  }).catch(responce.error('Error'));
};

module.exports.getListOfSessions = function(req, res) {
  token
  .verify(req.headers)
  .then(
    function(userData) {
      sessionDomain
      .getSessionsByUserId(userData._id)
      .then(
        responce.success(res, 'List is ready'),
        responce.error(res)
      )
      .catch(responce.error(res));
    },
    responce.error(res)
  ).catch(responce.invalidToken(res));
};

module.exports.startNewSession = function(req, res) {
  token
  .verify(req.headers)
  .then(function(userData) {
    sessionDomain
    .getNewSessionInitials(req, userData)
    .spread(sessionDomain.startNew)
    .then(
      responce.success(res, 'New sesion started'),
      responce.error(res)
    )
    .catch(responce.error(res));
  }, responce.invalidToken(res));
};

module.exports.updateSession = function(req, res) {
  debug('Attempt to update session');
  token.verify(req.headers).then(
    function(userData) {
      sessionDomain.fetchSessionId(req).then(
        function(sessionId) {
          sessionDomain
          .updateSession(sessionId, userData._id, req.body)
          .then(
            sendReloadSignal(res, 'The initial code was updated'),
            responce.error(res)
          )
          .catch(responce.error(res));
        },
        responce.error(res)
      )
      .catch(responce.error(res));
    },
    responce.invalidToken(res)
  );
};

module.exports.appendSnapshotToSession = function(req, res) {
  token
  .verify(req.headers)
  .then(function() {
    sessionDomain
    .sessionSnapshotPayloadValid(req)
    .spread(sessionDomain.appendSnapshotToSession)
    .then(
      sendReloadSignal(res, 'A new snapshot have been appended'),
      responce.error(req)
    );
  }, responce.invalidToken(res));
};

module.exports.getSessionHTML = function(req, res) {
  sessionDomain
  .fetchSessionId(req)
  .then(
    function(sessionId) {
      sessionDomain
      .getSessionAsset(sessionId, 'html')
      .then(responce.sendHTML(res), responce.error(res))
      .catch(responce.error(res));
    },
    responce.error(res)
  )
  .catch(responce.error(res));
};

module.exports.getSessionJS = function(req, res) {
  sessionDomain
  .fetchSessionId(req)
  .then(
    function(sessionId) {
      sessionDomain
      .getSessionAsset(sessionId, 'js')
      .then(responce.sendJS(res), responce.error(res))
      .catch(responce.error(res));
    },
    responce.error(res)
  )
  .catch(responce.error(res));
};

module.exports.getSessionCSS = function(req, res) {
  sessionDomain
  .fetchSessionId(req)
  .then(
    function(sessionId) {
      sessionDomain
      .getSessionAsset(sessionId, 'css')
      .then(responce.sendCSS(res), responce.error(res))
      .catch(responce.error(res));
    },
    responce.error(res)
  )
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
    return responce.error(res, 'Sessions id is not specified');
  }

  sessionPromise
  .then(sessionDomain.getSessionSnapshotById(snapshotId))
  .spread(function(session, snapshot) {
    debug('We have session and snapshot');
    return renderer.renderSession(session, snapshot);
  })
  .then(
    function(resultingHTML) {
      debug('Sessions has been rendered');
      return res.status(200).set('Content-Type', 'text/html').send(resultingHTML);
    },
    responce.error(res, 'Problem while generation of result')
  )
  .catch(responce.error(res, 'Unable to generate the result for the session'));
};

module.exports.renderLatestsSnapshot = function(req, res) {
  var sessionId = req.params.sessionId || '';

  sessionDomain.getSessionsById(sessionId)
  .then(sessionDomain.getSessionSnapshotById(null))
  .spread(renderer.renderSnapshot)
  .then(
    function(resultingHTML) {
      debug('Got rendering result %s', resultingHTML);
      res.status(200).set('Content-Type', 'text/html').send(resultingHTML);
    },
    responce.error('Unable to generate the result for the session')
  )
  .catch(responce.error(res, 'Unable to generate the result for the session'));
};
