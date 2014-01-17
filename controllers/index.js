'use strict';

var config = require('../config')
  , render = require('../lib').render
  , models = require('../models')
  , moment = require('moment')
  ;

module.exports.init = function(app) {
  app.get('/', getHome);
  app.get('/portfolio', getPortfolio);
  app.get('/services', getServices);
  app.get('/blog', getBlog);
  app.get('/about', getAbout);
};

function getHome(req, res) {
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

function getPortfolio(req, res) {
  render(res, 'generic', {
    pageTitle: 'Portfolio'
  });
}

function getServices(req, res) {
  render(res, 'generic', {
    pageTitle: 'Services'
  });
}

function getBlog(req, res) {
  render(res, 'generic', {
    pageTitle: 'Blog'
  });
}

function getAbout(req, res) {
  render(res, 'about', {
    pageTitle: 'About William Youmans'
  });
}
