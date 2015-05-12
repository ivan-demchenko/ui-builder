'use strict';

var express = require('express'),
    routes = require('./routes'),
    bodyParser = require('body-parser'),
    morgan = require('morgan');

var app = express();

app.set('view engine', 'jade');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/data', express.static('./data'));

if (process.env.NODE_ENV === 'dev') {
  app.use(express.static('./.tmp'));
  app.use(morgan('dev'));
  app.set('view cache', false);
} else if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./dist'));
  app.locals.cache = 'memory';
}

routes(app);

module.exports = app;
