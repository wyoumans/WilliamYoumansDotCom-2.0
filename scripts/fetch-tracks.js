'use strict';

var getHistory = require('lastfm-history')
  , config     = require('../config')
  , logger     = require('../lib').logger
  , worker     = getHistory(config.lastfm.username, config.lastfm.key)
  , Track      = require('../models').Track
  , async      = require('async')
  , _          = require('lodash')
  ;

(function() {

  logger.info('Beginning Last FM Import');

  worker.on('page', function(tracks, meta) {

    async.each(tracks, function(trackData, done) {
      var scrobbleDate = undefined,
          lastid       = undefined;

      if (trackData.date) {
        scrobbleDate = new Date(trackData.date['#text']);
        scrobbleDate.setHours(scrobbleDate.getHours() - 7);
        lastid = trackData.date.uts;
      } else {
        return done();
      }

      var track = {
        lastid: lastid,
        href: trackData.url,
        name: trackData.name,
        artist: trackData.artist['#text'],
        album: trackData.album['#text'],
        imageSrc: _.last(trackData.image)['#text'], // largest image we can get
        scrobbleDate: scrobbleDate
      }

      new Track(track).save(function(err) {
        done(null);
      });
    }, function(err) {
      if (err) {
        logger.error(err);
      }

      // only care about one page
      logger.info('Last FM Import Complete');
      process.exit();
    });
  });

  worker.on('complete', function() {
    logger.info('Last FM Import Complete');
    process.exit();
  });

  worker.on('error', function(err) {
    console.log('Error communicating with lastFM');
    logger.error(err.toString());
    process.exit();
  });
})();
