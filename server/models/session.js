'use strict';

var snapshotSchema = require('./snapshot').schema,
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

sessionSchema.statics.addSnapshot = function(sessionId, newSnapshotTree, done) {
  var newSnapshot = new snapshotModel({ code:newSnapshotTree });
  return this.model('Session').findOne({ _id: sessionId }, function(err, session) {
    if (err || !session) {
      return done(err);
    }
    session.snapshots.push(newSnapshot);
    session.save(function(err) {
      if (err) {
        return done(err);
      }
      return done(null, session.snapshots[session.snapshots.length - 1]);
    });
  });
};

module.exports = mongoose.model('Session', sessionSchema);
