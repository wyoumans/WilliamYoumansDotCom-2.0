'use strict';

var Schema = require('mongoose').Schema
    ;

var ToolSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  href: {
    type: String,
    required: true
  },
  category: String,
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  }
});

module.exports = ToolSchema;
