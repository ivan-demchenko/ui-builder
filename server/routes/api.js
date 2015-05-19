'use strict';

var debug = require('debug')('server:routes:api'),
    ws = require('../socket'),
    message = require('./responseMessages'),
    token = require('../token'),
    session = require('../domain/builderSession');

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

module.exports.setSessionInitial = function(req, res) {
  token.verify(req.headers)
  .then(function(err, userData) {
    var sessionId = req.params.id;

    debug('Attempt to update initials for session %s', sessionId);

    // TODO: check if initial is set in request
    session.updateInitial(sessionId, userData._id, req.body.initial)
    .then(success(res, 'The initial code was updated'), serverError(res, 'Unable to update session code'))
    .catch(serverError(res, 'Unable to update session code'));
  }, invalidTokenError(res));
};

module.exports.getSessionInitial = function(req, res) {
  token.verify(req.headers)
  .then(function() {
    var sessionId = req.params.id || '';

    debug('Attempt to get initial code for session %s', sessionId);

    session.getSessionInitialCode(sessionId)
    .then(success(res, 'Here the initial code is'), serverError(res, 'Seems that session %s does not exists'))
    .catch(serverError(res, 'Error while fetching initial data for session'));
  }, invalidTokenError(res));
};

module.exports.appendSessionSnapshot = function(req, res) {
  // TODO: refactor this method to use promises
  token.verify(req.headers)
  .then(function() {
    var sessionId = req.params.id;
    if (!sessionId) {
      return serverError(req, 'Session has not been found')();
    }

    if (typeof req.body.tree === 'undefined') {
      return serverError(req, 'Tree has not been provided for a new snapshot')();
    }

    var tree = req.body.tree.trim() || '';

    debug('Attempt to append a new snapshot for the session %s', sessionId);
    debug('A new snaphot: ', tree);

    session.appendSessionSnapshot(sessionId, tree)
    .then(function(updatedSession) {
      ws.broadcast('reload');
      success(res, 'A new snapshot have been appended')(updatedSession);
    }, serverError(req, 'Unable to save a new snapshot'));
  }, invalidTokenError(res));
};

module.exports.getLastSessionSnapshot = function(req, res) {
  var sessionId = req.params.id || '';

  debug('Attempt to get the result for the session %s', sessionId);

  session.getLastSnapshotBySessionId(sessionId)
  .then(res.send, serverError(res, 'Unable to fetch latest snapshot'))
  .catch(serverError(res, 'Unable to fetch latest snapshot'));
};

module.exports.getSessionHTML = function(req, res) {
  var sessionId = req.params.id || '';

  debug('Attempt to get HTML code for session %s', sessionId);

  session.getSessionAsset(sessionId, 'html')
  .then(function(code) {
    return res.set('Content-Type', 'text/html').send(code);
  }, serverError(res, 'Unable to fetch code code'))
  .catch(serverError(res, 'Unable to fetch code code'));
};

module.exports.getSessionJS = function(req, res) {
  var sessionId = req.params.id || '';

  debug('Attempt to get JS code for session %s', sessionId);

  session.getSessionAsset(sessionId, 'js')
  .then(function(code) {
    return res.set('Content-Type', 'text/javascript').send(code);
  }, serverError(res, 'Unable to fetch code code'))
  .catch(serverError(res, 'Unable to fetch code code'));
};

module.exports.getSessionCSS = function(req, res) {
  var sessionId = req.params.id || '';

  debug('Attempt to get CSS code for session %s', sessionId);

  session.getSessionAsset(sessionId, 'css')
  .then(function(code) {
    res.set('Content-Type', 'text/css').send(code);
  }, serverError(res, 'Unable to fetch code code'))
  .catch(serverError(res, 'Unable to fetch code code'));
};

module.exports.getSessionResult = function(req, res) {
  debug('Get session result');
  var sessionId = req.params.sessionId || '',
      snapshotId = req.params.snapshotId || '';

  session.generateSessionResult(sessionId, snapshotId)
  .then(function(resultingHTML) {
    return res.status(200).set('Content-Type', 'text/html').send(resultingHTML);
  }, serverError(res, 'Problem while generation of result'))
  .catch(serverError(res, 'Unable to generate the result for the session'));
};

module.exports.getSharedSessionResult = function(req, res) {
  debug('Get shared session result');
  var shortSessionId = req.params.shortId || '';
  session.generateSessionResultByShortId(shortSessionId)
  .then(function(resultingHTML) {
    res.status(200).set('Content-Type', 'text/html').send(resultingHTML);
  }, serverError(res, 'Unable to generate the result for the session'))
  .catch(serverError(res, 'Unable to generate the result for the session'));
};

module.exports.getLastSessionSnapshotAsHTML = function(req, res) {
  var sessionId = req.param('id') || '';

  session.generateSnapshotHTML(sessionId, null)
  .then(function(resultingHTML) {
    res.status(200).set('Content-Type', 'text/html').send(resultingHTML);
  }, serverError('Unable to generate the result for the session'))
  .catch(serverError(res, 'Unable to generate the result for the session'));
};
