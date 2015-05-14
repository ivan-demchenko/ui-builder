'use strict';

var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
    owner: { type: String, required: true },
    title: { type: String, default: '' },
    created: { type: Date, default: Date.now },
    initial: {
      html: { type: String, default: '' },
      js: { type: String, default: '' },
      css: { type: String, default: '' }
    }
});

module.exports = mongoose.model('Session', sessionSchema);
