'use strict';

var debug = require('debug')('server:domain:builderSession'),
    sessionModel = require('../models/session'),
    jsdom = require('node-jsdom'),
    serializeDocument = jsdom.serializeDocument,
    Q = require('q'),
    beautifyHtml = require('js-beautify').html;

function setBulkAttribubutes(el, attr) {
  for(var k in attr) {
    el.setAttribute(k, attr[k]);
  }
}

function setDefaultAttributes(el, attrs) {
  attrs.forEach(setBulkAttribubutes);
}

function parameterIsAttribute(par) {
  return typeof par.attribute !== 'undefined';
}

function parameterIsNodeAttribute(par) {
  return typeof par.nodeAttribute !== 'undefined';
}

function setParameters(el, params, $) {
  var domElementAttrs = params
  .filter(parameterIsAttribute)
  .reduce(function(initMap, parameter) {
    initMap[parameter.attribute] = initMap[parameter.attribute] || [];
    if (parameter.value.trim()) {
      initMap[parameter.attribute].push(parameter.value);
    }
    return initMap;
  }, {});

  for(var k in domElementAttrs) {
    el.setAttribute(k, domElementAttrs[k].join(' '));
  }

  params
  .filter(parameterIsNodeAttribute)
  .forEach(function(par) {
    if (par.nodeAttribute === 'innerText') {
      debug('Set inner text %s', par.value);
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
  return Q.promise(function(resolve, reject) {
    sessionModel.findOne(params, function(err, session) {
      if (err) {
        reject(new Error(err));
      }
      if (!session) {
        return reject('Session has not been found');
      }
      return resolve(session);
    });
  });
}

function allSessions(params) {
  return Q.promise(function(resolve, reject) {
    sessionModel.find(params, function(err, list) {
      if (err) {
        return reject(new Error(err));
      }
      if (!list) {
        return reject('Sessions has not been found');
      }
      resolve(list);
    });
  });
}

function getRendererEnv(session) {
  return Q.promise(function(resolve) {
    jsdom.env(session.initial.html, ['http://localhost:3000/scripts/jquery.js'], function (errors, window) {
      resolve({
        $: window.jQuery,
        document: window.document,
        body: window.document.body
      });
    });
  });
}

function renderSession(session, snapshot) {
  return Q.promise(function(resolve, reject) {
    if (snapshot) {
      getRendererEnv(session).then(function(env) {
        json2html(JSON.parse(snapshot.tree), env.document, env.body, env.$);
        resolve(beautifyHtml(serializeDocument(env.body)));
      });
    } else {
      reject('No snapshot provided');
    }
  });
}

function renderFullSession(session, snapshot) {
  debug('Appempt to render full session');

  return Q.promise(function(resolve) {
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

        resolve(serializeDocument(env.document));
      });
    } else {
      debug('...Without snapshot, just session');
      getRendererEnv(session).then(function(env) {
        resolve(serializeDocument(env.document));
      });
    }
  });
}

function getSessionsById(sessionId, ownerId) {
  return oneSession({_id: sessionId, owner: ownerId});
}

function startNew(userId, title, initialCode) {
  debug('Starting a new builder session');
  return Q.promise(function(resolve, reject) {
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
        return reject(new Error(err));
      }

      debug('The new builder session has been saved to DB: %s', newSession._id);

      resolve(newSession);
    });
  });
}

function updateInitial(sessionId, ownerId, newInitial) {
  debug('Updating the initial code for sesssion %s of owner %s', sessionId, ownerId);

  return Q.promise(function(resolve, reject) {
    var query = { '_id': sessionId, 'owner': ownerId };
    var update = { $set: { initial: newInitial } };

    sessionModel.findOneAndUpdate(query, update, {}, function(err, session) {
      if (err) {
        reject(new Error(err));
      }
      if (!session) {
        reject('Can not set session initial');
      }
      resolve(session);
    });
  });
}

function getSessionsByUserId(userId) {
  debug('Attempt to get list of sessions for user %s', userId);

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

function appendSessionSnapshot(sessionId, snapshotTree) {
  debug('Attempt to save a snapshot for the session %s', sessionId);
  return Q.promise(function(resolve, reject) {
    sessionModel.addSnapshot(sessionId, snapshotTree, function(err, snapshot) {
      if (err || !snapshot) {
        return reject(err);
      }
      debug('A new snapshot for the session %s has been saved', sessionId);
      resolve(snapshot);
    });
  });
}

function getLastSnapshotBySessionId(sessionId) {
  debug('Attempt to fetch the result for the session # %s', sessionId);

  return oneSession({_id: sessionId}).then(function(session) {
    if (session.snapshots.length) {
      return session.snapshots[session.snapshots.length - 1].tree || '[]';
    }
    return '[]';
  });
}

function getSessionSnapshotById(session, snapshotId) {
  return Q.promise(function(resolve) {
    if (snapshotId) {
      resolve(session.snapshots.id(snapshotId));
    } else if (session.snapshots.length) {
      resolve(session.snapshots[session.snapshots.length - 1]);
    } else {
      resolve('');
    }
  });
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
module.exports.getSessionsById = getSessionsById;
module.exports.updateInitial = updateInitial;
module.exports.getSessionsByUserId = getSessionsByUserId;
module.exports.getSessionInitialCode = getSessionInitialCode;
module.exports.getSessionAsset = getSessionAsset;
module.exports.appendSessionSnapshot = appendSessionSnapshot;
module.exports.getLastSnapshotBySessionId = getLastSnapshotBySessionId;
module.exports.generateSessionResult = generateSessionResult;
module.exports.generateSnapshotHTML = generateSnapshotHTML;
module.exports.generateSessionResultByShortId = generateSessionResultByShortId;
