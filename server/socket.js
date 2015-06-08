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

module.exports.setUp = function(config) {
  wss = new WebSocketServer({ port: config.webSocketsServer.port });
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
  debug('Number of clients', clients.length);
  clients = clients.filter(clientIsActive);
  debug('Number of active clients', clients.length);
  clients.forEach(notifyClient(msg));
};
