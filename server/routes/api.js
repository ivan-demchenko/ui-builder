'use strict';

var debug = require('debug')('server:routes:api'),
    ws = require('../socket'),
    message = require('./responseMessages'),
    token = require('../token'),
    session = require('../domain/builderSession');

function serverError(msg) {
  return function(err) {
    return res.status(500).json(message.error(msg, err));
  };
}

module.exports.getListOfSessions = function(req, res) {
  token.verify(req.headers, function(err, userData) {
    if (err) {
      return res.sendStatus(401);
    }

    debug('Try to get the list of sessions for the user %s', JSON.stringify(userData));

    session.getSessionsByUserId(userData._id).then(function(sessionsList) {
      res.status(200).json(message.success('List is ready', sessionsList));
    }, function(err) {
      return res.status(404).json(message.error('Unable to fetch session list', err));
    }).catch(serverError('Error while fetching session list'));
  });
};

module.exports.startNewSession = function (req, res) {
  token.verify(req.headers, function(err, userData) {
    if (err) {
      return res.sendStatus(401);
    }

    debug('Try to start a new session for user # %s', userData._id);

    var title = req.body.title.trim() || '';
    var initial = {
      html: req.body.initialSetup.html.trim() || '',
      css: req.body.initialSetup.css.trim() || '',
      js: req.body.initialSetup.js.trim() || ''
    };

    session.startNew(userData._id, title, initial, function(err, sessionObj) {
      if (err || !sessionObj) {
        return res.status(500).json(message.error('Failed to get session id', err));
      }

      return res.json(message.success('New session started', {
        sessionId: sessionObj._id
      }));
    });
  });
};

module.exports.setSessionInitial = function(req, res) {
  token.verify(req.headers, function(err, userData) {
    if (err) {
      return res.sendStatus(401);
    }

    var sessionId = req.params.id;

    debug('Attempt to update initials for session %s', sessionId);

    // TODO: check if initial is set in request
    session.updateInitial(sessionId, userData._id, req.body.initial).then(function(updatedSession) {
      return res.status(200).json(message.success('The initial code was updated', updatedSession));
    }, function(err) {
      return res.status(400).json(message.error('Unable to update session code', err));
    })
    .catch(serverError('Unable to update session code'));
  });
};

module.exports.getSessionInitial = function(req, res) {
  token.verify(req.headers, function(err) {
    if (err) {
      return res.sendStatus(401);
    }

    var sessionId = req.params.id || '';

    debug('Attempt to get initial code for session id # %s', sessionId);

    session.getSessionInitialCode(sessionId).then(function(initial) {
      return res.status(200).json(message.success('Here the initial code is', initial));
    }, function(err) {
      return res.status(404).json(message.error('Seems that session %s does not exists: ', err));
    }).catch(serverError('Error while fetching initial data for session'));
  });
};

module.exports.appendSessionSnapshot = function(req, res) {
  // TODO: refactor this method to use promises
  token.verify(req.headers, function(err) {
    if (err) {
      return res.sendStatus(401);
    }

    var sessionId = req.params.id;
    if (!sessionId) {
      return res.status(500).json(message.error('Session with id %s has not been found', sessionId));
    }

    if (typeof req.body.tree === 'undefined') {
      return res.status(500).json(message.error('Tree has not been provided for a new snapshot'));
    }

    var tree = req.body.tree.trim() || '';

    debug('Attempt to append a new snapshot for the session %s', sessionId);
    debug('A new snaphot: ', tree);

    session.appendSessionSnapshot(sessionId, tree, function(err, updatedSession) {
      if (err || !updatedSession) {
        return res.status(500).json(message.error('Unable to save a new snapshot', err));
      }

      ws.broadcast('reload');
      return res.status(200).json(message.success('A new snapshot have been appended'));
    });
  });
};

module.exports.getLastSessionSnapshot = function(req, res) {
  var sessionId = req.params.id || '';

  debug('Attempt to get the result for the session %s', sessionId);

  session.getLastSnapshotBySessionId(sessionId, function(err, code) {
    if (err) {
      debug('Error while fetching the result for the session %s', sessionId);
      return res.status(500).json(message.error('Unable to fetch js code', err));
    }
    return res.send(code);
  });
};

module.exports.getSessionHTML = function(req, res) {
  var sessionId = req.params.id || '';

  debug('Attempt to get HTML code for session id # %s', sessionId);

  session.getSessionAsset(sessionId, 'html').then(function(code) {
    res.set('Content-Type', 'text/html').send(code);
  }, function(err) {
    return res.status(400).json(message.error('Unable to fetch code code', err));
  }).catch(serverError('Unable to fetch code code'));
};

module.exports.getSessionJS = function(req, res) {
  var sessionId = req.params.id || '';

  debug('Attempt to get JS code for session id # %s', sessionId);

  session.getSessionAsset(sessionId, 'js').then(function(code) {
    res.set('Content-Type', 'text/html').send(code);
  }, function(err) {
    return res.status(400).json(message.error('Unable to fetch code code', err));
  }).catch(serverError('Unable to fetch code code'));
};

module.exports.getSessionCSS = function(req, res) {
  var sessionId = req.params.id || '';

  debug('Attempt to get CSS code for session id # %s', sessionId);

  session.getSessionAsset(sessionId, 'css').then(function(code) {
    res.set('Content-Type', 'text/html').send(code);
  }, function(err) {
    return res.status(400).json(message.error('Unable to fetch code code', err));
  }).catch(serverError('Unable to fetch code code'));
};

module.exports.getSessionResult = function(req, res) {
  var sessionId = req.param('sessionId') || '',
      snapshotId = req.param('snapshotId') || '';

  session.generateSessionResult(sessionId, snapshotId).then(function(resultingHTML) {
    res.status(200).set('Content-Type', 'text/html').send(resultingHTML);
  }, function(err) {
    res.status(404).send(err);
  }).catch(serverError('Unable to generate the result for the session'));
};

module.exports.getSharedSessionResult = function(req, res) {
  var shortSessionId = req.param('shortId') || '';
  session.generateSessionResultByShortId(shortSessionId).then(function(resultingHTML) {
    res.status(200).set('Content-Type', 'text/html').send(resultingHTML);
  }).catch(serverError('Unable to generate the result for the session'));
};

module.exports.getLastSessionSnapshotAsHTML = function(req, res) {
  var sessionId = req.param('id') || '';

  session.generateSnapshotHTML(sessionId, null).then(function(resultingHTML) {
    res.status(200).set('Content-Type', 'text/html').send(resultingHTML);
  }).catch(serverError('Unable to generate the result for the session'));
};
