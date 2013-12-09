'use strict';

var getHistory = require('lastfm-history')
  , config     = require('../config')
  , worker     = getHistory('gotwilly', config.lastfm.key)
  , Track      = require('../models').Track
  , async      = require('async')
  , _          = require('lodash')
  ;

(function() {

  console.log();
  console.log('============ Beginning Last FM Import ============');

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
          // prevent db errors from stopping the script
          done(null);
        });
    }, function(err) {
      if (err) {
        console.error(err);
      }

      // only care about one page
      console.log();
      console.log('============ Last FM Import Complete ============');
      process.exit();
    });
  });

  worker.on('complete', function() {
    console.log();
    console.log('============ Last FM Import Complete ============');
    process.exit();
  });

  worker.on('error', function(err) {
    console.log('err:', err);
    process.exit();
  });
})();
