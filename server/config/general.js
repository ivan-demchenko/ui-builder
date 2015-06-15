'use strict';

var env = process.env;

function mongoAddr(addr) {
  return addr ? 'mongodb://' + addr + '/' : null;
}

module.exports = {
  token: {
    exp: (60 * 60),
    secret: 'b0a06e9e-a0a4-461f-b608-d5afbe1ce2ac'
  },
  webSocketsServer: {
    port: 3001
  },
  httpServer: {
    host: env.UIB_SRV_HOST || 'http://localhost',
    port: env.UIB_SRV_PORT || 3000
  },
  mongo: {
    host: (env.UIB_MNG_HOST || mongoAddr(env.MONGO_PORT_27017_TCP_ADDR) || 'mongodb://localhost/') + 'uibuilder',
    options: {}
  },
  redis: {
    host: env.UIB_RDS_HOST || env.UIB_REDIS_PORT_6379_TCP_ADDR || '127.0.0.1',
    port: env.UIB_RDS_PORT || env.UIB_REDIS_PORT_6379_TCP_PORT || 6379,
    options: {}
  }
};
