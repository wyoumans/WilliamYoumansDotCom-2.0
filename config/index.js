'use strict';

var defaults = {
  "mongoConnectionString": "mongodb://localhost/williamyoumans",
  "supportsCaching": false,
  "port": 3000,
  "logToFile": true,
  "serverEmail": "no-reply@williamyoumans.com",
  "adminEmail": process.env.ADMIN_EMAIL,
  "useMinifiedAssets": true,
  "analytics": process.env.GOOGLE_ANALYTICS,
  "lastfm": {
    "key": process.env.LASTFM_KEY,
    "secret": process.env.LASTFM_SECRET
  },
  "instagram": {
    "key": process.env.INSTAGRAM_KEY,
    "secret": process.env.INSTAGRAM_SECRET,
    "token": process.env.INSTAGRAM_TOKEN,
    "userid": process.env.INSTAGRAM_USERID
  },
  "sendgrid": {
    "user": process.env.SENDGRID_USER,
    "key": process.env.SENDGRID_KEY
  }
};

var confrodo = require('confrodo')
  , env      = __dirname + '/' + confrodo.env + '.json'
  , config   = confrodo(defaults, env, 'ENV', 'ARGV')
  ;

module.exports = config;
