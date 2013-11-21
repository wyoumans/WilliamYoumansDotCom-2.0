'use strict';

var Schema = require('mongoose').Schema;

var TrackSchema = new Schema({
  mbid: String, //last.fm identifier
  href: String,
  slug: String,
  name: String,
  artist: String,
  album: String,
  imageHref: String,
  strobbleDate: Date
});

module.exports = TrackSchema;
