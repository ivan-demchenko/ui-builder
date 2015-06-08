'use strict';

module.exports = {
  token: {
    exp: (60 * 60),
    secret: 'b0a06e9e-a0a4-461f-b608-d5afbe1ce2ac'
  },
  webSocketsServer: {
    port: 3001
  },
  httpServer: {
    host: process.env.SRV_HOST || 'http://localhost',
    port: process.env.SRV_PORT || 3000
  },
  mongo: {
    host: process.env.MNG || 'mongodb://localhost/uibuilder',
    options: {}
  },
  redis: {
    host: process.env.RDS_HOST || '127.0.0.1',
    port: process.env.RDS_PORT || 6379,
    options: {}
  }
};
