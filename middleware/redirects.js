'use strict';

var Redirect = require('../models').Redirect;

module.exports = function() {
  return function(req, res, next) {

    Redirect.findOne({
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
