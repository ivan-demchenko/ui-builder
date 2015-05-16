'use strict';

var debug = require('debug')('server:sessionModel'),
    snapshotSchema = require('./snapshot').schema,
    snapshotModel = require('./snapshot').model,
    mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
    owner: { type: String, required: true },
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

  var newSnapshot = new snapshotModel({ tree: snapshotTree });

  return this.model('Session').findOne({ _id: sessionId }, function(err, session) {
    if (err || !session) {
      return done(err);
    }
    session.snapshots.push(newSnapshot);
    session.save(function(err) {
      if (err) {
        return done(err);
      }
      return done(null, newSnapshot);
    });
  });
};

module.exports = mongoose.model('Session', sessionSchema);
