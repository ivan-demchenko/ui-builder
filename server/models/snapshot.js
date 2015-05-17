'use strict';

var mongoose = require('mongoose');

var snapshotSchema = new mongoose.Schema({
  _session: { type: String, required: true },
  tree: { type: String, default: '' },
  created: { type: Date, default: Date.now }
});

module.exports.schema = snapshotSchema;
module.exports.model = mongoose.model('Snapshot', snapshotSchema);
