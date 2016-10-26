'use strict';

var Schema = require('mongoose').Schema
  ;

var PostSchema = new Schema({
  slug: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  metaDescription: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  copy: {
    type: Array,
    default: [],
    required: true
  },
  gistURL: {
    type: String,
    required: false
  },
  demoURL: {
    type: String,
    required: false
  },
  tags: {
    type: Array,
    default: [],
    required: false
  },
  publishedAt: {
    type: Date,
    required: true
  }
});

module.exports = PostSchema;
