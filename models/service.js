'use strict';

var Schema = require('mongoose').Schema
    ;

var ServiceSchema = new Schema({
  column: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  content: {
    type: String,
    required: false
  }
});

module.exports = ServiceSchema;
