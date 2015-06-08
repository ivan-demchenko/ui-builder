'use strict';

var path = require('path');

module.exports = {
  paths: {
    static: path.resolve(__dirname, '../../dist'),
    internal: path.resolve(__dirname, '../../dist/internal')
  },
  token: {
    exp: (60 * 60 * 60)
  }
};
