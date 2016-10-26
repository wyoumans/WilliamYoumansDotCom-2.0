'use strict';

var logger    = require('../lib').logger
  , services  = require('./data/posts')
  , Post      = require('../models').Post
  , async     = require('async')
  , mongoose  = require('mongoose')
  ;

(function() {

  logger.info('Beginning Blog Post Import');

  mongoose.connection.collections['posts'].drop(function(err) {
    logger.info('Posts dropped');

    async.each(posts, function(post, done) {
      logger.info('inserting ' + post.slug);

      post.publishedAt = new Date(post.publishedAt);

      new Post(post).save(done);

    }, function(err) {
      if (err) {
        logger.error(err);
      }

      logger.info('Post Import Complete');
      process.exit();
    });
  });
})();
