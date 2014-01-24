'use strict';

var logger   = require('../lib').logger
  , tools    = require('./data/tools')
  , Tool     = require('../models').Tool
  , async    = require('async')
  , mongoose = require('mongoose')
  ;

(function() {

  logger.info('Beginning Tool Import');

  mongoose.connection.collections['tools'].drop(function(err) {
    logger.info('Tools dropped');

    async.each(Object.keys(tools), function(category, done) {
      async.each(tools[category], function(tool, finish) {
        tool.category = category;
        logger.info('inserting ' + tool.name);
        new Tool(tool).save(finish);
      }, done);
    }, function(err) {
      if (err) {
        logger.error(err);
      }

      logger.info('Tool Import Complete');
      process.exit();
    });
  });
})();
