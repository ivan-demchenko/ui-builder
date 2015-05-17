'use strict';

var debug = require('debug')('server:websocket'),
    WebSocketServer = require('ws').Server,
    wss = null,
    clients = [];

function notifyClient(msg) {
  return function(client) {
    client.send(msg);
  };
}

function clientIsActive(client) {
  return client.readyState !== 3;
}

module.exports.setUp = function() {
  wss = new WebSocketServer({ port: 3001 });
  debug('Websocket server has been setup');
  wss.on('connection', function(client) {
    debug('A new connection');
    clients.push(client);
  });
};

module.exports.broadcast = function(msg) {
  if (!wss) {
    throw new Error('Websocket server is not initialized');
  }

  debug('Broadcasting %s message', msg);

  clients = clients.filter(clientIsActive);
  clients.forEach(notifyClient(msg));
};
