'use strict';

var Schema = require('mongoose').Schema
  ;

var TweetSchema = new Schema({
  tweetid: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  tweetDate: {
    type: Date,
    required: true
  },
  href: {
    type: String,
    required: true
  },
  content: String
});

module.exports = TweetSchema;
