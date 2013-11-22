'use strict';

var getHistory = require('lastfm-history')
  , config = require('../config')
  ;

module.exports.init = function(app) {
  app.get('/', index);
  app.get('/portfolio', portfolio);
  app.get('/services', services);
  app.get('/blog', blog);
  app.get('/about', about);
  app.get('/contact', contact);

  // app.get('/last', last);
};

function index(req, res) {
  res.render('index', {
    title: 'Home'
  });
}

function portfolio(req, res) {
  res.render('generic', {
    title: 'Portfolio'
  });
}

function services(req, res) {
  res.render('generic', {
    title: 'Services'
  });
}

function blog(req, res) {
  res.render('generic', {
    title: 'Blog'
  });
}

function about(req, res) {
  res.render('generic', {
    title: 'About William'
  });
}

function contact(req, res) {
  res.render('generic', {
    title: 'Request a Quote'
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

  res.render('generic', {
    title: 'Last FM'
  });
}
