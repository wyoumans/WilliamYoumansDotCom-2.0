'use strict';

var Schema = require('mongoose').Schema;

var ImageSchema = new Schema({
  href: {
    type: String,
    required: true
  },
  src: {
    type: String,
    required: true
  },
  postDate: {
    type: Date,
    required: true
  },
  instid: {
    type: String,
    required: true,
    unique: true,
    index: true
  }
});

module.exports = ImageSchema;
