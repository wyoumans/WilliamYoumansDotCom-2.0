'use strict';

var Schema = require('mongoose').Schema
    ;

var TweetSchema = new Schema({
  twitterid: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  href: {
    type: String,
    required: true
  },
  content: String
});

module.exports = TweetSchema;
