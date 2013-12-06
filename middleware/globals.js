'use strict';

var models = require('../models'),
    moment = require('moment');

module.exports = function(req, res, next) {
  models.Track.findOne({}, 'scrobbleDate href imageSrc', {
    sort: {
      scrobbleDate: -1
    }
  }, function(err, track) {
    res.locals.footerContent = {
      photo: {
        src: 'http://distilleryimage2.s3.amazonaws.com/d8c6fbcc5ddc11e39703123fed77b305_6.jpg',
        href: 'http://instagram.com/p/hjOTaDMslK/'
      },
      movie: {},
      track: {}
    };

    if (track) {
      track.date_formatted = moment(track.scrobbleDate).fromNow();
      res.locals.footerContent.track = track;
    }

    return next();
  });
}
