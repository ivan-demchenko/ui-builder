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

  app.post('/auth/register', auth.register);
  app.post('/auth/login', auth.login);
  app.post('/auth/logout', auth.logout);

  // app.get(/api/session) - get the list of my sessions
  // app.post(/api/session) - save session snapshot
  app.post('/api/session/initial', jwt({secret: config.token.secret}), api.setSessionInitial);
  app.get('/api/session/new', jwt({secret: config.token.secret}), api.startNewSession);

  app.get('/*', main.indexPage);
};
