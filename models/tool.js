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
  x: Number,
  y: Number,
  sort: Number
});

module.exports = ToolSchema;
