'use strict';

var debug = require('debug')('server:sessionModel'),
    snapshotModel = require('./snapshot').model,
    snapshotSchema = require('./snapshot').schema,
    mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    readableId: { type: String, required: true },
    title: { type: String, default: '' },
    created: { type: Date, default: Date.now },
    initial: {
      html: { type: String, default: '' },
      js: { type: String, default: '' },
      css: { type: String, default: '' }
    },
    snapshots: [snapshotSchema]
});

sessionSchema.statics.addSnapshot = function(sessionId, snapshotTree, done) {
  debug('Try to append a snaphot %s', snapshotTree);

  var newSnapshot = new snapshotModel({ tree: snapshotTree, _session: sessionId });

  var update = { $push: { snapshots: newSnapshot } };
  this.model('Session').findByIdAndUpdate(sessionId, update, function(err, session) {
    if (err) {
      debug(err);
      return done(err);
    }
    debug('A new snapshot has been added');
    done(null, session);
  });
};

module.exports = mongoose.model('Session', sessionSchema);
