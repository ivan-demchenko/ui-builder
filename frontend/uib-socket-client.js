'use strict';

var socket = require('ws'),
    host = window.location.hostname,
    ws = new socket('ws://' + host + ':3001');

ws.onopen = function() {
    console.log('connected!');
};

ws.onmessage = function(message) {
    if (message.data === 'reload') {
      window.location.reload();
    }
};

ws.onclose = function close() {
  console.log('disconnected');
};

window.addEventListener('unload', function() {
  ws.close();
});
