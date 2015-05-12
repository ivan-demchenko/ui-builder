'use strict';

var mongoose = require('mongoose');

var Session = new mongoose.Schema({
    owner: { type: String, required: true, unique: true },
    title: { type: String, default: '' },
    htmlCode: { type: String, default: '' },
    jsCode: { type: String, default: '' },
    cssCode: { type: String, default: '' }
});

module.exports.sessionModel = mongoose.model('Session', Session);
