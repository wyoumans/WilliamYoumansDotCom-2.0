'use strict';

var Schema = require('mongoose').Schema;

var ImageSchema = new Schema({
  href: String,
  src: String,
  postDate: Date
});

module.exports = ImageSchema;
