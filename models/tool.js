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
  slug: String,
  category: String,
  sort: Number
});

ToolSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/\W+/g, '-');
  }

  next();
});

ToolSchema.methods.getImagePath = function() {
  return '/images/content/tools/' + this.slug + '.jpg';
}

module.exports = ToolSchema;
