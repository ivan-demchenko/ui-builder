'use strict';

var expressServer = require('./server/express');
var mongoServer = require('./server/mongo');

mongoServer();

var runner = expressServer.listen(3000, function () {
  var host = runner.address().address;
  var port = runner.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
