'use strict';

var env = process.env.NODE_ENV || 'production';
var debug = require('debug')('uib:server:domain:renderer'),
    Q = require('q'),
    jsdom = require('node-jsdom'),
    config = require('../../config')(env),
    serializeDocument = jsdom.serializeDocument,
    beautifyHtml = require('js-beautify').html;

function setElementAttrVal($, el, attrName, attrVal) {
  return attrName === 'class'     ? $(el).addClass(attrVal) :
         attrName === 'innerText' ? $(el).text(attrVal) :
         $(el).attr(attrName, attrVal);
}

function parameterIsAttribute(par) {
  return typeof par.attribute !== 'undefined';
}

function parameterIsNodeAttribute(par) {
  return typeof par.nodeAttribute !== 'undefined';
}

function setElementBehaviors($, el, behaviorsList) {
  behaviorsList.forEach(function(behavItem) {
    setElementAttrVal($, el, behavItem.attr, behavItem.value);
  });
}

function setElementParameters($, el, params) {
  var reGroupedAttrs = params
  .filter(parameterIsAttribute)
  .reduce(function(resultMap, parameter) {
    if (parameter.inUse) {
      resultMap[parameter.attribute] = resultMap[parameter.attribute] || [];
      var value = parameter.value.trim();
      if (value) {
        resultMap[parameter.attribute].push(value);
      }
    }
    return resultMap;
  }, {});

  for (var attrName in reGroupedAttrs) {
    setElementAttrVal($, el, attrName, reGroupedAttrs[attrName].join(' '));
  }

  params
  .filter(parameterIsNodeAttribute)
  .forEach(function(par) {
    if (par.inUse) {
      setElementAttrVal($, el, par.nodeAttribute, par.value);
    }
  });
}

function setDefaultAttributes($, el, attrs) {
  attrs.forEach(function(attr) {
    for (var attrName in attr) {
      setElementAttrVal($, el, attrName, attr[attrName]);
    }
  });
}

function json2html(arrayOfItems, document, root, $) {
  arrayOfItems.forEach(function(rec) {
    var el = document.createElement(rec.tagName);
    if (rec.attributes) {
      setDefaultAttributes($, el, rec.attributes);
    }
    if (rec.parameters) {
      setElementParameters($, el, rec.parameters);
    }
    if (rec.behaviors) {
      setElementBehaviors($, el, rec.behaviors);
    }
    root.appendChild(el);
    if (rec.children && rec.children.length) {
      json2html(rec.children, document, el, $);
    }
  });
}

function getRendererEnv(sessionHTML) {
  return Q.promise(function(resolve) {
    var jqueryUrl = config.httpServer.host + ':' + config.httpServer.port + '/internal/jquery.js';
    jsdom.env(sessionHTML, [jqueryUrl], function(errors, window) {
      resolve({
        $: window.jQuery,
        document: window.document,
        body: window.document.body
      });
    });
  });
}

function appendJS(env, url) {
  var socketClientScript = env.document.createElement('script');
  socketClientScript.type = 'text/javascript';
  socketClientScript.charset = 'UTF-8';
  socketClientScript.src = url;
  env.document.head.appendChild(socketClientScript);
}

function appendCSS(env, url) {
  var style = env.document.createElement('link');
  style.rel = 'stylesheet';
  style.type = 'text/css';
  style.href = url;
  env.document.head.appendChild(style);
}

module.exports.renderSnapshot = function(session, snapshot) {
  debug('Attempt to render snapshot');
  return Q.promise(function(resolve) {
    if (!snapshot) {
      debug('Snapshot is missing');
      return resolve('<!-- session is empty -->');
    }
    debug('Found a snapshot, set up render env');
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
      debug('Rendering the sesion using snapshot');
      getRendererEnv(session.initial.html).then(function(env) {
        debug('Rendering environment has been setup');
        json2html(JSON.parse(snapshot.tree), env.document, env.body, env.$);

        appendCSS(env, '/api/session/' + session._id + '/css');
        appendJS(env, '/api/session/' + session._id + '/js');
        appendJS(env, '/scripts/uib-socket-client.js');

        resolve(serializeDocument(env.document));
      });
    } else {
      debug('Rendering the sesion without a snapshot, just session');
      return resolve(getRendererEnv(session.initial.html).then(function(env) {
        return serializeDocument(env.document);
      }));
    }
  });
};
