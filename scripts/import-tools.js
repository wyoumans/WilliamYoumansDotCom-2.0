'use strict';

var logger = require('../lib').logger
  , tools  = require('./data/tools')
  , Tool   = require('../models').Tool
  , async  = require('async')
  ;

(function() {

  logger.info('Beginning Tool Import');

  Tool.remove({});

  async.each(Object.keys(tools), function(category, done) {
    async.each(tools[category], function(tool, finish) {
      tool.category = category;
      new Tool(tool).save(finish);
    }, done);
  }, function(err) {
    if (err) {
      logger.error(err);
    }

    logger.info('Tool Import Complete');
    process.exit();
  });
})();
