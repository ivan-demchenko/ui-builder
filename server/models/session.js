'use strict';

var mongoose = require('mongoose');

var session = new mongoose.SchemaSchema({
    owner: { type: String, required: true },
    title: { type: String, default: '' },
    created: { type: Date, default: Date.now },
    initial: {
      htmlCode: { type: String, default: '' },
      jsCode: { type: String, default: '' },
      cssCode: { type: String, default: '' }
    }
});

session.methods.setHTML = function(newHTML, done)Schema {
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

session.methods.setCSS = function(newCSS, done)Schema {
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

session.methods.setJS = function(newJS, done)Schema {
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
