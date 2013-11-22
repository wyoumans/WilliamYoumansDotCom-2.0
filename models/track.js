'use strict';

var Schema = require('mongoose').Schema;

var TrackSchema = new Schema({
  mbid: { // last.fm identifier
    type: String,
    required: true,
    unique: true,
    index: true
  },
  href: String,
  name: String,
  artist: String,
  album: String,
  imageHref: String,
  strobbleDate: Date
});

module.exports = TrackSchema;
