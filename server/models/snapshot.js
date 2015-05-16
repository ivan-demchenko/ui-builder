'use strict';

var mongoose = require('mongoose');

var snapshotSchema = new mongoose.Schema({
    created: { type: Date, default: Date.now },
    tree: { type: String, default: '' }
});

module.exports.schema = snapshotSchema;
module.exports.model = mongoose.model('Snapshot', snapshotSchema);
