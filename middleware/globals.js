'use strict';

var models = require('../models'),
    moment = require('moment');

module.exports = function(req, res, next) {
  models.Track.findOne({}, 'scrobbleDate href imageSrc', {
    sort: {
      scrobbleDate: -1
    }
  }, function(err, track) {
    models.Image.findOne({}, 'postDate href src', {
      sort: {
        postDate: -1
      }
    }, function(err, image) {

      res.locals.footerContent = {};

      if (track) {
        track.date_formatted = moment(track.scrobbleDate).fromNow();
        res.locals.footerContent.track = track;
      }

      if (image) {
        image.date_formatted = moment(image.postDate).fromNow();
        res.locals.footerContent.image = image;
      }

      // temporary hard coded movie
      res.locals.footerContent.movie = {
        href: 'http://www.amazon.com/Star-Trek-VI-Undiscovered-Theatrical/dp/B000I3P3EM',
        src: 'http://ecx.images-amazon.com/images/I/51yLQ9m7EcL._SX215_.jpg'
      };

      return next();
    });
  });
}
