'use strict';

var socket = require('ws'),
    ws = new socket('ws://localhost:3001');

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
