'use strict';

var debug = require('debug')('server:domain:builderSession'),
    sessionModel = require('../models/session'),
    jsdom = require('node-jsdom'),
    serializeDocument = jsdom.serializeDocument,
    Q = require('q'),
    beautifyHtml = require('js-beautify').html;

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

function json2html(arrayOfItems, document, root, $) {
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
      json2html(rec.children, document, el, $);
    }
  });
}

function oneSession(params) {
  var def = Q.defer();
  sessionModel.findOne(params, function(err, session) {
    if (err) {
      throw new Error(err);
    }
    if (!session) {
      return def.reject('Session has not been found');
    }
    return def.resolve(session);
  });
  return def.promise;
}

function allSessions(params) {
  var def = Q.defer();
  sessionModel.find(params, function(err, list) {
    if (err) {
      throw new Error(err);
    }
    if (!list) {
      return def.reject('Sessions has not been found');
    }
    return def.resolve(list);
  });
  return def.promise;
}

function getRendererEnv(session) {
  var def = Q.defer();
  jsdom.env(session.initial.html, ['http://code.jquery.com/jquery-1.5.min.js'], function (errors, window) {
    def.resolve({
      $: window.jQuery,
      document: window.document,
      body: window.document.body
    });
  });
  return def.promise;
}

function renderSession(session, snapshot) {
  var def = Q.defer();
  if (snapshot) {
    getRendererEnv(session).then(function(env) {
      json2html(JSON.parse(snapshot.tree), env.document, env.body, env.$);
      def.resolve(beautifyHtml(serializeDocument(env.body)));
    });
  } else {
    def.reject('No snapshot found');
  }
  return def.promise;
}

function renderFullSession(session, snapshot) {
  debug('Appempt to render full session');

  var def = Q.defer();
  if (snapshot) {
    debug('...Using snapshot');
    getRendererEnv(session).then(function(env) {
      debug('...environment has been setup');
      json2html(JSON.parse(snapshot.tree), env.document, env.body, env.$);

      var style = env.document.createElement('link');
      style.rel = 'stylesheet';
      style.type = 'text/css';
      style.href = '/api/session/' + session._id + '/css';
      env.document.head.appendChild(style);

      var sessionScript = env.document.createElement('script');
      sessionScript.type = 'text/javascript';
      sessionScript.charset = 'UTF-8';
      sessionScript.src = '/api/session/' + session._id + '/js';
      env.document.head.appendChild(sessionScript);

      var socketClientScript = env.document.createElement('script');
      socketClientScript.type = 'text/javascript';
      socketClientScript.charset = 'UTF-8';
      socketClientScript.src = '/scripts/uib-socket-client.js';
      env.document.head.appendChild(socketClientScript);

      def.resolve(serializeDocument(env.document));
    });
  } else {
    debug('...Wihtout snapshot, just session');
    getRendererEnv(session).then(function(env) {
      def.resolve(serializeDocument(env.document));
    });
  }
  return def.promise;
}

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

function updateInitial(sessionId, ownerId, newInitial) {
  debug('Updating the initial code for sesssion %s of owner %s', sessionId, ownerId);

  var def = Q.defer();
  var query = { '_id': sessionId, 'owner': ownerId };
  var update = { $set: { initial: newInitial } };

  sessionModel.findOneAndUpdate(query, update, {}, function(err, session) {
    if (err) {
      throw err;
    }
    if (!session) {
      def.reject('Can not set session initial');
    }
    def.resolve(session);
  });
  return def.promise;
}

function getSessionsByUserId(userId) {
  debug('Attempt to get list of sessions for user', userId);

  return allSessions({ owner: userId });
}

function getSessionInitialCode(sessionId) {
  debug('Attempt to get initial code for session: %s', sessionId);

  return oneSession({_id: sessionId}).then(function(session) {
    return session.initial;
  });
}

function getSessionAsset(sessionId, type) {
  debug('Attempt to get assets for session id # %s', sessionId);

  return oneSession({_id: sessionId}).then(function(session) {
    return session.initial[type];
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

function getSessionSnapshotById(session, snapshotId) {
  var def = Q.defer();
  if (snapshotId) {
    def.resolve(session.snapshots.id(snapshotId));
  } else if (session.snapshots.length) {
    def.resolve(session.snapshots[session.snapshots.length - 1]);
  } else {
    def.reject(null);
  }
  return def.promise;
}

function generateSessionResult(sessionId, snapshotId) {
  debug('Attempt to generate session result for session "%s" and snapshot "%s"', sessionId, snapshotId);

  return oneSession({_id: sessionId}).then(function(session) {
    return getSessionSnapshotById(session, snapshotId).then(function(snapshot) {
      return renderFullSession(session, snapshot);
    });
  });
}

function generateSnapshotHTML(sessionId, snapshotId) {
  debug('Attempt to generate snapshot html for session "%s" and snapshot "%s"', sessionId, snapshotId);

  return oneSession({_id: sessionId}).then(function(session) {
    return getSessionSnapshotById(session, snapshotId).then(function(snapshot) {
      return renderSession(session, snapshot);
    });
  });
}

function generateSessionResultByShortId(shortId) {
  return oneSession({readableId: shortId}).then(function(session) {
    return getSessionSnapshotById(session).then(function(snapshot) {
      return renderSession(session, snapshot);
    });
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
module.exports.generateSessionResultByShortId = generateSessionResultByShortId;
