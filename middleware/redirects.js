'use strict';

var models = require('../models');

module.exports = function() {
  return function(req, res, next) {

    models.Redirect.findOne({
      before: req.path
    }, function(err, redirect) {
      if (redirect) {
        return res.redirect(301, redirect.after);
      } else {
    		return next();
      }
    });
  };
};
