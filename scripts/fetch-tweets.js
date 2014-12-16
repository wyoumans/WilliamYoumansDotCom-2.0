'use strict';

var Twitter = require('node-twitter')
  , config  = require('../config')
  , logger  = require('../lib').logger
  , Tweet   = require('../models').Tweet
  , _       = require('lodash')
  ;

var twitterRestClient = new Twitter.RestClient(
  config.twitter.consumer_key,
  config.twitter.consumer_secret,
  config.twitter.token,
  config.twitter.token_secret
);

(function() {

  logger.info('Beginning Twitter Import');

  twitterRestClient.statusesHomeTimeline({}, function(err, results) {
    if (err) {
      logger.error('Error: ' + (err.code ? err.code + ' ' + err.message : err.message));
      return finished();
    }

    if (results) {

      console.log(_.first(results));
      console.log();
      console.log(results.length);
      console.log();

      var tweet = {
        content: 'content',
        tweetDate: new Date(),
        tweetid: 'blah',
        href: 'http://www.google.com'
      };

      return finished();
/*
      new Tweet(tweet).save(function(err) {

        // prevent db errors from stopping the script
        finished();
      });
*/
    }
  });
})();

var finished = function() {
  logger.info('Twitter Import Complete');
  process.exit();
}
