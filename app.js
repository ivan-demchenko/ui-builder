'use strict';

var expressApp = require('./server/express');
var socketServer = require('./server/socket');
var mongoClient = require('./server/mongo');

mongoClient.connect();
socketServer.setUp();

var runner = expressApp.listen(3000, function() {
  var host = runner.address().address;
  var port = runner.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
