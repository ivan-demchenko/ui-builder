'use strict';

var debug = require('debug')('server:domain:builderSession'),
    sessionModel = require('../models/session'),
    jsdom = require('node-jsdom'),
    serializeDocument = jsdom.serializeDocument,
    beautifyHtml = require('js-beautify').html;

function startNew(userId, title, initialCode, done) {
  debug('Starting a new builder session');

  var id = Math.random().toString(16).substr(2);

  var newSession = new sessionModel({
    readableId: id,
    owner: userId,
    title: title,
    initial: initialCode,
    snapshots: []
  });

  newSession.save(function(err) {
    if (err) {
      debug('Error while saving new session: %s', err.message);
      return done(err);
    }

    debug('The new builder session has been saved to DB: %s', newSession._id);

    return done(null, newSession);
  });
}

function updateInitial(sessionId, ownerId, newInitial, done) {
  debug('Updating the initial code for sesssion %s of owner %s', sessionId, ownerId);

  var query = { '_id': sessionId, 'owner': ownerId };
  var update = { $set: { initial: newInitial } };

  sessionModel.findOneAndUpdate(query, update, {}, function(err, session) {
    if (err || !session) {
      return done(new Error('Can not find session with id: ' + sessionId));
    }

    debug('Session initials has been updated');

    done(null, session);
  });
}

function getSessionsByUserId(userId, done) {
  debug('Attempt to get list of sessions for user', userId);

  sessionModel.find({ owner: userId }, function(err, list) {
    if (err || !list) {
      return done(err);
    }

    debug('Sessions list has been fetched: %s', list.length);

    return done(null, list);
  });
}

function getSessionInitialCode(sessionId, done) {
  debug('Attempt to get initial code for session: %s', sessionId);

  sessionModel.findOne({_id: sessionId}, 'initial', function(err, initial) {
    if (err) {
      return done(err);
    }

    if (!initial) {
      debug('Session initials have been found');
      return done(null, null);
    }

    return done(null, initial);
  });
}

function getSessionAsset(sessionId, type, done) {
  debug('Attempt to get assets for session id # %s', sessionId);

  sessionModel.findOne({_id: sessionId}, function(err, session) {
    if (err || !session) {
      debug('Failes to find a session %s', sessionId);
      return done(err);
    }

    debug('Session initials have been found');

    return done(null, session.initial[type]);
  });
}

function appendSessionSnapshot(sessionId, snapshotTree, done) {
  debug('Attempt to save a snapshot for the session %s', sessionId);

  sessionModel.addSnapshot(sessionId, snapshotTree, function(err, snapshot) {
    if (err || !snapshot) {
      debug('Failed to save a snapshot the the session %s', sessionId);
      return done(err);
    }

    debug('A new snapshot for the session %s has been saved', sessionId);

    return done(null, snapshot);
  });
}

function getLastSnapshotBySessionId(sessionId, done) {
  debug('Attempt to fetch the result for the session # %s', sessionId);

  sessionModel.findOne({_id: sessionId}, function(err, session) {
    if (err || !session) {
      debug('Failes to find a session %s', sessionId);
      return done(err);
    }

    debug('Session has been found');
    if (session.snapshots.length) {
      return done(null, session.snapshots[session.snapshots.length - 1].tree || '');
    } else {
      return done(null, []);
    }
  });
}

function setDefaultAttributes(el, attrs) {
  attrs.forEach(function(attr) {
    for(var k in attr) {
      el.setAttribute(k, attr[k]);
    }
  });
}

function setParameters(el, params, $) {
  var domElementAttrs = params.filter(function(par) {
    return typeof par.attribute !== 'undefined';
  }).reduce(function(initMap, parameter) {
    initMap[parameter.attribute] = initMap[parameter.attribute] || [];
    if (parameter.value.trim()) {
      initMap[parameter.attribute].push(parameter.value);
    }
    return initMap;
  }, {});

  for(var k in domElementAttrs) {
    el.setAttribute(k, domElementAttrs[k].join(' '));
  }

  params.filter(function(par) {
    return typeof par.nodeAttribute !== 'undefined';
  }).forEach(function(par) {
    if (par.nodeAttribute === 'innerText') {
      debug('Set inner text %s', par.value)
      $(el).text(par.value);
    }
  });
}

function json2html(document, arrayOfItems, root, $) {
  arrayOfItems.forEach(function(rec) {
    var el = document.createElement(rec.tagName);
    if (rec.attributes) {
      setDefaultAttributes(el, rec.attributes);
    }
    if (rec.parameters) {
      setParameters(el, rec.parameters, $);
    }
    root.appendChild(el);
    if (rec.children && rec.children.length) {
      json2html(document, rec.children, el);
    }
  });
}

function getSessionSnapshotById(session, snapshotId) {
  var snapshot;
  if (snapshotId) {
    snapshot = session.snapshots.id(snapshotId);
    if (!snapshot) {
      snapshot = session.snapshots[session.snapshots.length - 1];
    }
  } else {
    snapshot = session.snapshots[session.snapshots.length - 1];
  }
  return snapshot;
}

function generateSessionResult(sessionId, snapshotId, done) {
  debug('Attempt to generate session result for session "%s" and snapshot "%s"', sessionId, snapshotId);

  sessionModel.findOne({_id: sessionId}, function(err, session) {
    if (err || !session) {
      debug(err);
      done(err);
    }
    var snapshot = getSessionSnapshotById(session, snapshotId);

    jsdom.env(
      session.initial.html,
      [ 'http://code.jquery.com/jquery-1.5.min.js' ],
      function (errors, window) {
        var $ = window.jQuery;
        var doc = window.document;
        var head = doc.head;
        var body = doc.body;

        if (snapshot) {
          json2html(doc, JSON.parse(snapshot.tree), body, $);
        }

        var style = doc.createElement('link');
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.href = '/api/session/' + sessionId + '/css';
        head.appendChild(style);

        var sessionScript = doc.createElement('script');
        sessionScript.type = 'text/javascript';
        sessionScript.charset = 'UTF-8';
        sessionScript.src = '/api/session/' + sessionId + '/js';
        head.appendChild(sessionScript);

        var socketClientScript = doc.createElement('script');
        socketClientScript.type = 'text/javascript';
        socketClientScript.charset = 'UTF-8';
        socketClientScript.src = '/scripts/uib-socket-client.js';
        head.appendChild(socketClientScript);

        done(null, serializeDocument(doc));
      }
    );
  });
}

function generateSnapshotHTML(sessionId, snapshotId, done) {
  sessionModel.findOne({_id: sessionId}, function(err, session) {
    if (err || !session) {
      return done(err);
    }
    var snapshot;
    if (snapshotId) {
      snapshot = getSessionSnapshotById(session, snapshotId);
    }
    snapshot = session.snapshots[session.snapshots.length - 1];

    jsdom.env(
      session.initial.html,
      [ 'http://code.jquery.com/jquery-1.5.min.js' ],
      function (errors, window) {
        var $ = window.jQuery;
        var doc = window.document;
        var body = doc.body;

        if (snapshot) {
          json2html(doc, JSON.parse(snapshot.tree), body, $);
        }

        done(null, beautifyHtml(serializeDocument(body)));
      }
    );
  });
}

module.exports.startNew = startNew;
module.exports.updateInitial = updateInitial;
module.exports.getSessionsByUserId = getSessionsByUserId;
module.exports.getSessionInitialCode = getSessionInitialCode;
module.exports.getSessionAsset = getSessionAsset;
module.exports.appendSessionSnapshot = appendSessionSnapshot;
module.exports.getLastSnapshotBySessionId = getLastSnapshotBySessionId;
module.exports.generateSessionResult = generateSessionResult;
module.exports.generateSnapshotHTML = generateSnapshotHTML;
