'use strict';

var debug = require('debug')('server:domain:renderer'),
    Q = require('q'),
    jsdom = require('node-jsdom'),
    serializeDocument = jsdom.serializeDocument,
    beautifyHtml = require('js-beautify').html;

function setDefaultAttributes(el, attrs) {
  attrs.forEach(function(attr) {
    for(var k in attr) {
      el.setAttribute(k, attr[k]);
    }
  });
}

function parameterIsAttribute(par) {
  return typeof par.attribute !== 'undefined';
}

function parameterIsNodeAttribute(par) {
  return typeof par.nodeAttribute !== 'undefined';
}

function setElementParameters(el, params, $) {
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
      setElementParameters(el, rec.parameters, $);
    }
    root.appendChild(el);
    if (rec.children && rec.children.length) {
      json2html(rec.children, document, el, $);
    }
  });
}

function getRendererEnv(sessionHTML) {
  return Q.promise(function(resolve) {
    jsdom.env(sessionHTML, ['http://localhost:3000/internal/jquery.js'], function (errors, window) {
      resolve({
        $: window.jQuery,
        document: window.document,
        body: window.document.body
      });
    });
  });
}

module.exports.renderSnapshot = function(session, snapshot) {
  debug('Attempt to render snapshot');
  return Q.promise(function(resolve) {
    if (!snapshot) {
      debug('Snapshot is missing');
      return resolve('');
    }
    debug('Snapshot is here, set up render env');
    return resolve(getRendererEnv(session.initial.html).then(function(env) {
      json2html(JSON.parse(snapshot.tree), env.document, env.body, env.$);
      return beautifyHtml(serializeDocument(env.body));
    }));
  });
};

module.exports.renderSession = function(session, snapshot) {
  debug('Appempt to render full session');

  return Q.promise(function(resolve) {
    if (snapshot) {
      debug('...Using snapshot');
      getRendererEnv(session.initial.html).then(function(env) {
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
      return resolve(getRendererEnv(session.initial.html).then(function(env) {
        return serializeDocument(env.document);
      }));
    }
  });
};
