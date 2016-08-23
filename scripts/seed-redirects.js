'use strict';

var logger    = require('../lib').logger
  , redirects = require('./data/redirects')
  , Redirect  = require('../models').Redirect
  , async     = require('async')
  , mongoose  = require('mongoose')
  ;

(function() {

  logger.info('Beginning Redirect Import');

  mongoose.connection.collections['redirects'].drop(function(err) {
    logger.info('Redirects dropped');

    Redirect.remove({}, function() {

      async.each(redirects, function(redirect, done) {
        logger.info('inserting ' + redirect.before);
        new Redirect(redirect).save(done);

      }, function(err) {
        if (err) {
          logger.error(err);
        }

        logger.info('redirect Import Complete');
        process.exit();
      });
    });
  });
})();
