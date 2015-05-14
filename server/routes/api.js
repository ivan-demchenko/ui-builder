'use strict';

var debug = require('debug')('server:routes:api'),
    message = require('./responseMessages'),
    token = require('../token'),
    session = require('../domain/builderSession');

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
    session.updateInitial(sessionId, userData._id, req.body.initial, function(err, updatedSession) {
      if (err || !updatedSession) {
        return res.status(500).json(message.error('Unable to update session code', err));
      }

      res.status(200).json(message.success('The initial code was updated'));
    });
  });
};

module.exports.getListOfSessions = function(req, res) {
  token.verify(req.headers, function(err, userData) {
    if (err) {
      return res.sendStatus(401);
    }

    debug('Try to get the list of sessions for the user %s', JSON.stringify(userData));

    session.getUserSessions(userData._id, function(err, sessionsList) {
      if (err || !sessionsList) {
        return res.status(500).json(message.error('Unable to update session code', err));
      }

      res.status(200).json(message.success('List is ready', sessionsList));
    });
  });
};

module.exports.getSessionInitial = function(req, res) {
  token.verify(req.headers, function(err) {
    if (err) {
      return res.sendStatus(401);
    }

    var sessionId = req.params.id || '';

    debug('Attempt to get initial code for session id # %s', sessionId);

    session.getSessionInitialCode(sessionId, function(err, initials) {
      if (err || !initials) {
        return res.status(500).json(message.error('Unable to fetch initial code', err));
      }

      res.status(200).json(message.success('Here the initial code is', initials));
    });
  });
};

module.exports.setSessionResult = function(req, res) {
  res.send('Okay!');
};

module.exports.getSessionResult = function(req, res) {
  var sessionId = req.params.id || '';
  res.send(sessionId);
};

module.exports.getSessionJS = function(req, res) {
  var sessionId = req.params.id || '';

  debug('Attempt to get JS code for session id # %s', sessionId);

  session.getSessionAsset(sessionId, 'js', function(err, js) {
    if (err) {
      return res.status(500).json(message.error('Unable to fetch js code', err));
    }
    res.set('Content-Type', 'text/javascript').send(js);
  });
};

module.exports.getSessionCSS = function(req, res) {
  var sessionId = req.params.id || '';

  debug('Attempt to get CSS code for session id # %s', sessionId);

  session.getSessionAsset(sessionId, 'css', function(err, css) {
    if (err) {
      return res.status(500).json(message.error('Unable to fetch css code', err));
    }
    res.set('Content-Type', 'text/css').send(css);
  });
};
