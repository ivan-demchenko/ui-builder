var config = {
  httpServer: {
    host: 'http://localhost'
  },
  mongo: {
    host: 'mongodb://localhost/uibuilder',
    options: {}
  },
  token: {
    exp: 360,
    secret: 'b0a06e9e-a0a4-461f-b608-d5afbe1ce2ac'
  }
};

module.exports = config;
