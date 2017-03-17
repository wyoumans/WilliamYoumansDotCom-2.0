'use strict';

var Schema = require('mongoose').Schema
  ;

var ResourceSchema = new Schema({
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
  copy: {
    type: Array,
    default: [],
    required: false
  },
  bullets: {
    type: Array,
    default: [],
    required: false
  },
  serviceSlug: {
    type: String,
    required: true
  }
});

module.exports = ResourceSchema;
