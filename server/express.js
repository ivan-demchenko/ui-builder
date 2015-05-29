'use strict';

var express = require('express'),
    path = require('path'),
    routes = require('./routes'),
    bodyParser = require('body-parser'),
    morgan = require('morgan');

var app = express();

app.set('view engine', 'jade');
app.set('views', './views');

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));

app.use('/data', express.static('./data'));

var staticPath;
if (process.env.NODE_ENV === 'development') {
  staticPath = path.resolve(__dirname, '../.tmp');
  app.use('/internal', express.static('../.tmp/internal'));
  app.use(morgan('dev'));
  app.set('view cache', false);
} else if (process.env.NODE_ENV === 'production') {
  staticPath = path.resolve(__dirname, '../dist');
  app.use('/internal', express.static('../dist/internal'));
  app.locals.cache = 'memory';
} else {
  staticPath = path.resolve(__dirname, '../.tmp');
  app.use('/internal', express.static('../.tmp/internal'));
  app.use(morgan('dev'));
  app.set('view cache', false);
}
app.use(express.static(staticPath));

routes(app);

module.exports = app;
