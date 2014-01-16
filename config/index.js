'use strict';

var defaults = {
  "mongoConnectionString": "mongodb://localhost/williamyoumans",
  "port": 3000,
  "logToFile": true,
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
