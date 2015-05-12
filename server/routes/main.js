'use strict';

module.exports.indexPage = function (req, res) {
  res.render('index', {
    user: req.user || null
  });
};
