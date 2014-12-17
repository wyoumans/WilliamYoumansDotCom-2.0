'use strict';

var defaults = {
  "env": "local",
  "mongoConnectionString": "mongodb://localhost/williamyoumans",
  "supportsCaching": false,
  "port": 3000,
  "logToFile": true,
  "serverEmail": "no-reply@williamyoumans.com",
  "adminEmail": export ADMIN_EMAIL,
  "useMinifiedAssets": true,
  "showAnalytics": false,
  "analytics": export GOOGLE_ANALYTICS,
  "lastfm": {
    "username": "gotwilly",
    "key": export LASTFM_KEY,
    "secret": export LASTFM_SECRET
  },
  "instagram": {
    "key": export INSTAGRAM_KEY,
    "secret": export INSTAGRAM_SECRET,
    "token": export INSTAGRAM_TOKEN,
    "userid": export INSTAGRAM_USERID
  },
  "twitter": {
    "consumer_key": export TWITTER_CONSUMER,
    "consumer_secret": export TWITTER_CONSUMER_SECRET,
    "token": export TWITTER_TOKEN,
    "token_secret": export TWITTER_TOKEN_SECRET,
    "username": "wyoumansdev",
    "id": export TWITTER_ID
  },
  "sendgrid": {
    "user": export SENDGRID_USER,
    "key": export SENDGRID_KEY
  }
};

var confrodo = require('confrodo')
  , env      = __dirname + '/' + confrodo.env + '.json'
  , config   = confrodo(defaults, env, 'ENV', 'ARGV')
  ;

module.exports = config;
