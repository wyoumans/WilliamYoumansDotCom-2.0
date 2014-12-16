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

  twitterRestClient.statusesUserTimeline({
    // must be more than 1 because retweets are included in this number, but
    // I am excluding retweets so the system could falsly return no results
    count: 5,
    include_rts: false,
    exclude_replies: true,
    trim_user: true
  }, function(err, results) {
    if (err) {
      logger.error('Error: ' + (err.code ? err.code + ' ' + err.message : err.message));
      return finished();
    }

    if (results) {
      var result = _.first(results);

      var tweet = {
        content: result.text,
        tweetDate: new Date(result.created_at),

        // using id_str instead of id because they can be different. sometimes th id
        // is interpreted incorrectly because it is a veryv large integer
        tweetid: result.id_str,
        href: 'http://www.twitter.com/' + config.twitter.username + '/status/' + result.id_str
      };

      new Tweet(tweet).save(function(err) {

        // prevent db errors from stopping the script
        finished();
      });
    }
  });
})();

var finished = function() {
  logger.info('Twitter Import Complete');
  process.exit();
}
