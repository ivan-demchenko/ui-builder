'use strict';

var sessionModel = require('../models/session');

function startNew(userId, done) {
  var session = new sessionModel.sessionModel();
  session.owner = userId;
  session.save(function(err, obj) {
    if (err || !obj) {
      done(err);
    }
    done(null, obj);
  });
}

module.exports.startNew = startNew;
