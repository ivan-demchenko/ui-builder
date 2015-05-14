'use strict';

var jwt = require('express-jwt'),
    config = require('../config'),
    main = require('./main'),
    auth = require('./auth'),
    api = require('./api');

module.exports = function(app) {

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

  app.post('/auth/register', auth.register);
  app.post('/auth/login', auth.login);
  app.post('/auth/logout', auth.logout);

  app.get('/api/session/result/:id', api.getSessionResult);

  secureRequest('get', '/api/session', api.getListOfSessions);
  secureRequest('get', '/api/session/:id/initial', api.getSessionInitial);
  secureRequest('put', '/api/session/:id/initial', api.setSessionInitial);
  secureRequest('post', '/api/session/new', api.startNewSession);

  app.get('/*', main.indexPage);
};
