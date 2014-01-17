'use strict';

var config = require('../config')
  , render = require('../lib').render
  , models = require('../models')
  , moment = require('moment')
  ;

module.exports.init = function(app) {
  app.get('/', index);
  app.get('/portfolio', portfolio);
  app.get('/services', services);
  app.get('/blog', blog);
  app.get('/about', about);
  app.get('/contact', contact);
};

function index(req, res) {
  var locals = {};

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

      locals.footerContent = {};

      if (track) {
        track.date_formatted = moment(track.scrobbleDate).fromNow();
        locals.footerContent.track = track;
      }

      if (image) {
        image.date_formatted = moment(image.postDate).fromNow();
        locals.footerContent.image = image;
      }

      // temporary hard coded movie
      locals.footerContent.movie = {
        href: 'http://www.amazon.com/Star-Trek-VI-Undiscovered-Theatrical/dp/B000I3P3EM',
        src: 'http://ecx.images-amazon.com/images/I/51yLQ9m7EcL._SX215_.jpg'
      };

      locals.showMastHead = true;
      locals.showFooterMedia = true;

      render(res, 'home', locals);
    });
  });
}

function portfolio(req, res) {
  render(res, 'generic', {
    pageTitle: 'Portfolio'
  });
}

function services(req, res) {
  render(res, 'generic', {
    pageTitle: 'Services'
  });
}

function blog(req, res) {
  render(res, 'generic', {
    pageTitle: 'Blog'
  });
}

function about(req, res) {
  render(res, 'about', {
    pageTitle: 'About William Youmans'
  });
}

function contact(req, res) {
  render(res, 'generic', {
    pageTitle: 'Request a Quote'
  });
}
