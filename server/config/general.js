'use strict';

var env = process.env;

module.exports = {
  token: {
    exp: (60 * 60),
    secret: 'b0a06e9e-a0a4-461f-b608-d5afbe1ce2ac'
  },
  webSocketsServer: {
    port: env.UIB_WEBSOCKET_PORT || 3001
  },
  httpServer: {
    host: env.UIB_SRV_HOST || 'http://localhost',
    port: env.UIB_SRV_PORT || 3000
  },
  mongo: {
    host: 'mongodb://' + (env.UIB_MNG_HOST || 'localhost') + '/uibuilder',
    options: {}
  },
  redis: {
    host: env.UIB_RDS_HOST || '127.0.0.1',
    port: env.UIB_RDS_PORT || 6379,
    options: {}
  }
};
