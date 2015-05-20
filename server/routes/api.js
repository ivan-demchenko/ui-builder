'use strict';

var debug = require('debug')('server:routes:api'),
    ws = require('../socket'),
    token = require('../token'),
    session = require('../domain/builderSession'),
    renderer = require('../domain/renderer'),
    message = require('./responseMessages');

function serverError(res, msg) {
  return function(err) {
    debug(msg, err);
    return res.status(500).json(message.error(msg, err));
  };
}

function invalidTokenError(res) {
  return function(err) {
    res.status(401).json(message.error('Ivalid token', err));
  };
}

function success(res, msg) {
  return function(data) {
    debug(msg, data);
    return res.status(200).json(message.success(msg, data));
  };
}

module.exports.getSessionById = function(req, res) {
  debug('Attempt to get session by id');
  token.verify(req.headers).then(function(userData) {
    var sessionId = req.params.sessionId.trim() || '';
    debug('Try to get session by id %s', sessionId);
    session.getSessionsById(sessionId, userData._id)
    .then(success(res, 'Session has been found'), serverError(res, 'Session has not been found'))
    .catch(serverError(res, 'Error while fetching session'));
  }).catch(serverError('Error'));
};

module.exports.getListOfSessions = function(req, res) {
  token.verify(req.headers).then(function(userData) {
    debug('Try to get the list of sessions for the user %s', userData);
    session.getSessionsByUserId(userData._id)
    .then(success(res, 'List is ready'), serverError(res, 'Unable to fetch list of sessions'))
    .catch(serverError(res, 'Error while fetching session list'));
  }, function(err) {
    debug(err);
  }).catch(function(err) {
    debug(err);
    invalidTokenError(res)(err);
  });
};

module.exports.startNewSession = function (req, res) {
  token.verify(req.headers)
  .then(function(userData) {
    debug('Try to start a new session for user %s', userData._id);

    var title = req.body.title.trim() || '';
    var initial = {
      html: req.body.initialSetup.html.trim() || '',
      css: req.body.initialSetup.css.trim() || '',
      js: req.body.initialSetup.js.trim() || ''
    };

    session
    .startNew(userData._id, title, initial)
    .then(success(res, 'New sesion started'), serverError(res, 'Failed to get start a new session'))
    .catch(serverError(res, 'Failed to get start a new session'));

  }, invalidTokenError(res));
};

module.exports.updateSession = function(req, res) {
  token.verify(req.headers)
  .then(function(err, userData) {
    var sessionId = req.params.sessionId;

    debug('Attempt to update initials for session %s', sessionId);

    session.updateSession(sessionId, userData._id, req.body.initial)
    .then(success(res, 'The initial code was updated'), serverError(res, 'Unable to update session code'))
    .catch(serverError(res, 'Unable to update session code'));
  }, invalidTokenError(res));
};

module.exports.appendSnapshotToSession = function(req, res) {
  token.verify(req.headers)
  .then(function() {
    var sessionId = req.params.sessionId;
    if (!sessionId) {
      return serverError(req, 'Session has not been found')();
    }

    if (typeof req.body.tree === 'undefined') {
      return serverError(req, 'Tree has not been provided for a new snapshot')();
    }

    var tree = req.body.tree.trim() || '';

    debug('Attempt to append a new snapshot for the session %s', sessionId);
    debug('A new snaphot: ', tree);

    session.appendSnapshotToSession(sessionId, tree)
    .then(function(updatedSession) {
      ws.broadcast('reload');
      success(res, 'A new snapshot have been appended')(updatedSession);
    }, serverError(req, 'Unable to save a new snapshot'));
  }, invalidTokenError(res));
};

module.exports.getSessionHTML = function(req, res) {
  var sessionId = req.params.sessionId || '';

  debug('Attempt to get HTML code for session %s', sessionId);

  session.getSessionAsset(sessionId, 'html')
  .then(function(code) {
    return res.set('Content-Type', 'text/html').send(code);
  }, serverError(res, 'Unable to fetch code code'))
  .catch(serverError(res, 'Unable to fetch code code'));
};

module.exports.getSessionJS = function(req, res) {
  var sessionId = req.params.sessionId || '';

  debug('Attempt to get JS code for session %s', sessionId);

  session.getSessionAsset(sessionId, 'js')
  .then(function(code) {
    return res.set('Content-Type', 'text/javascript').send(code);
  }, serverError(res, 'Unable to fetch code code'))
  .catch(serverError(res, 'Unable to fetch code code'));
};

module.exports.getSessionCSS = function(req, res) {
  var sessionId = req.params.sessionId || '';

  debug('Attempt to get CSS code for session %s', sessionId);

  session.getSessionAsset(sessionId, 'css')
  .then(function(code) {
    res.set('Content-Type', 'text/css').send(code);
  }, serverError(res, 'Unable to fetch code code'))
  .catch(serverError(res, 'Unable to fetch code code'));
};

module.exports.renderSession = function(req, res) {
  debug('Get session result');
  var sessionPromise, sessionId, snapshotId;

  if (req.params.shortId) {
    debug('... by shared id');
    sessionPromise = session.getSessionsBySharedId(req.params.shortId);
  } else {
    debug('... by session id');
    sessionId = req.params.sessionId || '';
    snapshotId = req.params.snapshotId || '';
    sessionPromise = session.getSessionsById(sessionId);
  }

  sessionPromise
  .then(session.getSessionSnapshotById(snapshotId))
  .spread(function(session, snapshot) {
    debug('We have session and snapshot');
    return renderer.renderSession(session, snapshot);
  })
  .then(
    function(resultingHTML) {
      return res.status(200).set('Content-Type', 'text/html').send(resultingHTML);
    },
    serverError(res, 'Problem while generation of result')
  )
  .catch(serverError(res, 'Unable to generate the result for the session'));
};

module.exports.renderLatestsSnapshot = function(req, res) {
  var sessionId = req.params.sessionId || '';

  session.getSessionsById(sessionId)
  .then(session.getSessionSnapshotById(null))
  .spread(renderer.renderSnapshot)
  .then(
    function(resultingHTML) {
      debug('Got rendering result %s', resultingHTML);
      res.status(200).set('Content-Type', 'text/html').send(resultingHTML);
    },
    serverError('Unable to generate the result for the session')
  )
  .catch(serverError(res, 'Unable to generate the result for the session'));
};
