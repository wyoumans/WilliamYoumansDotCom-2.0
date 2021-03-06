'use strict';

var defaults = {
  "env": "local",
  "mongoConnectionString": "mongodb://localhost/williamyoumans",
  "supportsCaching": false,
  "port": 3000,
  "logToFile": true,
  "serverEmail": "no-reply@williamyoumans.com",
  "adminEmail": process.env.ADMIN_EMAIL,
  "useMinifiedAssets": true,
  "showAnalytics": false,
  "showHotjar": false,
  "analytics": process.env.GOOGLE_ANALYTICS,
  "hotjarid": process.env.HOT_JAR_ID,
  "lastfm": {
    "username": "gotwilly",
    "key": process.env.LASTFM_KEY,
    "secret": process.env.LASTFM_SECRET
  },
  "instagram": {
    "key": process.env.INSTAGRAM_KEY,
    "secret": process.env.INSTAGRAM_SECRET,
    "token": process.env.INSTAGRAM_TOKEN,
    "userid": process.env.INSTAGRAM_USERID
  },
  "twitter": {
    "consumer_key": process.env.TWITTER_CONSUMER_KEY,
    "consumer_secret": process.env.TWITTER_CONSUMER_SECRET,
    "token": process.env.TWITTER_TOKEN,
    "token_secret": process.env.TWITTER_TOKEN_SECRET,
    "username": "wyoumansdev",
    "id": process.env.TWITTER_ID
  },
  "sendgrid": {
    "user": process.env.SENDGRID_USER,
    "key": process.env.SENDGRID_KEY,
    "apikey": process.env.SENDGRID_API_KEY
  },
  "servicesBase": "services",
  "postsBase": "blog/detail"
};

var confrodo = require('confrodo')
  , env      = __dirname + '/' + confrodo.env + '.json'
  , config   = confrodo(defaults, env, 'ENV', 'ARGV')
  ;

module.exports = config;
