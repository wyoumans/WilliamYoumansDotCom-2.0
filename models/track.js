'use strict';

var Schema = require('mongoose').Schema;

var TrackSchema = new Schema({
  href: String,
  name: String,
  artist: String,
  album: String,
  imageHref: String,
  scrobbleDate: Date,
  lastid: {
    type: String,
    required: true,
    unique: true,
    index: true
  }
});

module.exports = TrackSchema;
