'use strict';

var config = require('../config')
  , render = require('../lib').render
  , models = require('../models')
  , moment = require('moment')
  ;

module.exports.init = function(app) {
  app.get('/', getHome);
  app.get('/projects', getProjects);
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
        href: 'http://www.amazon.com/Parenthood-Season-5-Monica-Potter/dp/B00GUOJJUW',
        src: 'http://ecx.images-amazon.com/images/I/81uXsVl7ObL._SL1500_.jpg'
      };

      locals.showMastHead = true;
      locals.showFooterMedia = true;

      render(res, 'home', locals);
    });
  });
}

function getProjects(req, res) {
  render(res, 'projects', {
    pageTitle: 'Projects'
  });
}

function getAbout(req, res) {
  render(res, 'about', {
    pageTitle: 'About'
  });
}
