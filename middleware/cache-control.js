'use strict';

var config = require('../config');

module.exports = function() {
  return function(req, res, next) {
    if (config.supportsCaching) {
      res.setHeader("Cache-Control", "public, max-age=3600");
    } else {
      res.setHeader("Expires", "Fri, 30 Oct 1998 14:19:41 GMT");
      res.setHeader("Cache-Control", "no-cache");
    }

    next();
  };
};
