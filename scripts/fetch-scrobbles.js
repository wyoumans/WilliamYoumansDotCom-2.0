'use strict';

var getHistory = require('lastfm-history')
  , config     = require('../config')
  , worker     = getHistory('gotwilly', config.lastfm.key)
  , Track      = require('../models').Track
  ;

(function() {

  console.log();
  console.log('============ Beginning Last FM Import ============');

  worker.on('page', function(tracks, meta) {
    console.log(tracks.length + ' scrobbles just pulled');
    console.log('meta:', meta);
    console.log(tracks);
    // store into database or file etc.
  });

  worker.on('complete', function() {
    console.log();
    console.log('============ Last FM Import  Complete ============');
    process.exit();
  });

  worker.on('error', function(err) {
    console.log('err:', err);
    process.exit();
  });
})();

/*
  // Format of last.fm response
 */
