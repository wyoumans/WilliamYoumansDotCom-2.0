'use strict';

var logger = require('../lib/logger');

module.exports = function() {
  return function(err, req, res, next) {
    logger.error(err);
    return res.status(500).render('errors/500');
  }
}
