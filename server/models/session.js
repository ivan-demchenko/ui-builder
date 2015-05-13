'use strict';

var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
    owner: { type: String, required: true },
    title: { type: String, default: '' },
    created: { type: Date, default: Date.now },
    initial: {
      htmlCode: { type: String, default: '' },
      jsCode: { type: String, default: '' },
      cssCode: { type: String, default: '' }
    }
});

sessionSchema.methods.setHTML = function(newHTML, done) {
  return this.find({ _id: this._id }, function(err, session) {
    session.initial.htmlCode = newHTML;
    session.save(function(err) {
      if (err) {
        return done(err);
      }
      done(null, session);
    });
  });
};

sessionSchema.methods.setCSS = function(newCSS, done) {
  return this.find({ _id: this._id }, function(err, session) {
    session.initial.cssCode = newCSS;
    session.save(function(err) {
      if (err) {
        return done(err);
      }
      done(null, session);
    });
  });
};

sessionSchema.methods.setJS = function(newJS, done) {
  return this.find({ _id: this._id }, function(err, session) {
    session.initial.jsCode = newJS;
    session.save(function(err) {
      if (err) {
        return done(err);
      }
      done(null, session);
    });
  });
};

module.exports = mongoose.model('Session', sessionSchema);
