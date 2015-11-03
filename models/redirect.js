'use strict';

var Schema = require('mongoose').Schema
  ;

var RedirectSchema = new Schema({
  before: {
    type: String,
    required: true
  },
  after: {
    type: String,
    required: true
  }
});

module.exports = RedirectSchema;
