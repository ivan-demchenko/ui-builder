'use strict';

var debug = require('debug')('uib:app'),
    configSetup = require('./config'),
    expressSetup = require('./server/express'),
    socketServer = require('./server/socket'),
    mongoClient = require('./server/mongo'),
    routesSetup = require('./server/routes');

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
