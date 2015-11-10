'use strict';

var Schema = require('mongoose').Schema
  ;

var TrackSchema = new Schema({
  href: {
    type: String,
    required: true
  },
  name: String,
  artist: String,
  album: String,
  imageSrc: {
    type: String,
    required: true
  },
  scrobbleDate: {
    type: Date,
    required: true
  },
  lastid: {
    type: String,
    required: true,
    unique: true,
    index: true
  }
});

module.exports = TrackSchema;
