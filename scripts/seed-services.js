'use strict';

var logger    = require('../lib').logger
  , services  = require('./data/services')
  , Service   = require('../models').Service
  , async     = require('async')
  , mongoose  = require('mongoose')
  ;

(function() {

  logger.info('Beginning Services Import');

  mongoose.connection.collections['services'].drop(function(err) {
    logger.info('Services dropped');

    async.each(services, function(service, done) {
      logger.info('inserting ' + service.slug);

      new Service(service).save(done);

    }, function(err) {
      if (err) {
        logger.error(err);
      }

      logger.info('Services Import Complete');
      process.exit();
    });
  });
})();
