'use strict';

var getHistory = require('lastfm-history')
  , config = require('../config')
  ;

module.exports.init = function(app) {
  app.get('/', index);
  // app.get('/last', last);
};

function index(req, res) {
  res.render('index', {
    title: 'Home'
  });
}

function last(req, res) {

  var worker = getHistory('gotwilly', config.lastfm.key);

  worker.on('page', function(tracks, meta) {
    console.log(tracks.length + ' scrobbles just pulled');
    console.log('meta:', meta);
    console.log(tracks);
    // store into database or file etc.
  });

  worker.on('complete', function() {
    console.log('complete');
    // start processing knowing you've got the whole dataset
  });

  worker.on('error', function(err) {
    console.log('err:', err);
  });

  res.render('index', {
    title: 'Last'
  });
}
