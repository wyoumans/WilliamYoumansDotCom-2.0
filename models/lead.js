'use strict';

var Schema = require('mongoose').Schema
  ;

var LeadSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  host: String
});

// validate email address
LeadSchema.path('email').validate(function(value) {
  return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/i.test(value);
}, 'invalid email');

module.exports = LeadSchema;
