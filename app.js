'use strict';

var debug = require('debug')('uib:app');
var expressSetup = require('./server/express');
var socketServer = require('./server/socket');
var mongoClient = require('./server/mongo');
var configSetup = require('./server/config');
var routesSetup = require('./server/routes');

var env = process.env.NODE_ENV || 'production';

var config = configSetup(env);

mongoClient.setUp(env, config);
socketServer.setUp(config);

var expressApp = expressSetup(env, config);

routesSetup(expressApp, config);

var runner = expressApp.listen(config.httpServer.port, function() {
  var host = runner.address().address;
  var port = runner.address().port;
  debug('Server: http://%s:%s', host, port);
});
