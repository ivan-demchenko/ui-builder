'use strict';

var jwt = require('express-jwt'),
    main = require('./main'),
    auth = require('./auth'),
    api = require('./api');

module.exports = function(app, config) {

  app.all('*', function(req, res, next) {
    res.set('Access-Control-Allow-Origin', config.httpServer.host);
    res.set('Access-Control-Allow-Credentials', true);
    res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.send(200);
    }
    next();
  });

  function secureRequest(method, url, handler) {
    app[method](url, jwt({secret: config.token.secret}), handler);
  }

  app.get('/', main.indexPage);

  app.post('/auth/register', auth.register);
  app.post('/auth/login', auth.login);
  app.post('/auth/logout', auth.logout);

  app.get('/api/session/:sessionId/js', api.getSessionJS);
  app.get('/api/session/:sessionId/css', api.getSessionCSS);
  app.get('/api/session/:sessionId/html', api.getSessionHTML);

  app.get('/api/session/:sessionId/result/:snapshotId?*', api.renderSession);
  app.get('/s/:shortId', api.renderSession);
  app.get('/edit-settings/:sessionId', main.indexPage);
  app.get('/api/session-initials/:sessionId', api.getSessionInitialsBySessionId);
  app.put('/api/session-initials/:sessionId', api.setSessionInitialsBySessionId);

  secureRequest('get', '/api/session', api.getListOfSessions);
  secureRequest('post', '/api/session', api.startNewSession);

  secureRequest('get', '/api/session/:sessionId', api.getSessionById);
  secureRequest('put', '/api/session/:sessionId', api.updateSession);

  secureRequest('get', '/api/session/:sessionId/snapshot/latest/render', api.renderLatestsSnapshot);
  secureRequest('post', '/api/session/:sessionId/snapshot', api.appendSnapshotToSession);

  app.get('*', main.indexPage);
};
