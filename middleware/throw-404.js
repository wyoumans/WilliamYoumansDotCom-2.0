'use strict';

var logger = require('../lib/logger')
  ;

module.exports = function(req, res) {
  logger.warn('404: ' + req.url);
  return res.status(404).render('errors/404');
};
