'use strict';

var path = require('path');

module.exports = {
  paths: {
    static: path.resolve(__dirname, '../../.tmp'),
    internal: path.resolve(__dirname, '../../.tmp/internal')
  }
};
