'use strict';

var Twitter = require('twitter')
  , config  = require('../config')
  , logger  = require('../lib').logger
  , Tweet   = require('../models').Tweet
  , async   = require('async')
  ;

var twitterRestClient = new Twitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.token,
  access_token_secret: config.twitter.token_secret
});

(function() {

  logger.info('Beginning Twitter Import');

  twitterRestClient.get('statuses/user_timeline', {
    count: 10, // retweets are included in this number even if excluded below
    // include_rts: false,
    exclude_replies: true,
    trim_user: true
  }, function(err, tweets, response) {

    if (tweets && tweets.length > 0) {

      async.each(tweets, function(tweet, done) {
        var tweetData = {
          content: tweet.text,
          tweetDate: new Date(tweet.created_at),

          // Using id_str instead of id because they can be different. sometimes th id
          // is interpreted incorrectly because it is a very large integer.
          tweetid: tweet.id_str,
          href: 'http://www.twitter.com/' + config.twitter.username + '/status/' + tweet.id_str
        };

        new Tweet(tweetData).save(function(err) {

          // prevent db errors from stopping the script
          done(null);
        });
      }, function(err) {
        if (err) {
          logger.error(err);
        }

        logger.info('Twitter Import Complete');
        process.exit();
      });
    } else {
      if (err) {
        logger.error(err);
      }

      logger.info('Twitter Import Complete');
      process.exit();
    }
  });
})();
