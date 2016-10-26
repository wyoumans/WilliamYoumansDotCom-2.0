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
    type: String,
    required: true
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
