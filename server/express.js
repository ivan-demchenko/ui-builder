'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan');

module.exports = function setUp(env, config) {
  var app = express();

  app.set('view engine', 'jade');
  app.set('views', './views');

  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(bodyParser.json({limit: '50mb'}));

  if (env === 'development') {
    app.use(morgan('dev'));
    app.set('view cache', false);
  }
  if (env === 'production') {
    app.locals.cache = 'memory';
  }

  app.use('/data', express.static('./data'));
  app.use('/internal', express.static(config.paths.internal));
  app.use(express.static(config.paths.static));

  return app;
};
