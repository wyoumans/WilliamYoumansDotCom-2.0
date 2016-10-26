'use strict';

var Schema = require('mongoose').Schema
  ;

var ServiceSchema = new Schema({
  column: {
    type: String,
    default: 'left',
    required: false
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
  excerpt: {
    type: String,
    required: true
  },
  copy: {
    type: Array,
    default: [],
    required: false
  },
  cases: {
    type: Array,
    default: [],
    required: false
  },
  sort: {
    type: Number,
    default: 1,
    required: false
  }
});

module.exports = ServiceSchema;
