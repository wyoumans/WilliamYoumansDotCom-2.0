'use strict';

var config = require('../config')
  , render = require('../lib').render
  , models = require('../models')
  , moment = require('moment')
  ;

module.exports.init = function(app) {
  app.get('/', getHome);
  app.get('/portfolio', getPortfolio);
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

      models.Tool.find({}, 'name slug href', {
        sort: {
          category: 1,
          sort: 1
        }
      }, function(err, tools) {

        locals.tools = tools;
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
          href: 'http://www.amazon.com/The-Andy-Griffith-Show-Complete/dp/B000NA21YA',
          src: 'http://ecx.images-amazon.com/images/I/5112Ga9dG%2BL.jpg'
        };

        locals.showMastHead = true;
        locals.showFooterMedia = true;

        render(res, 'home', locals);
      });
    });
  });
}

function getPortfolio(req, res) {
  res.redirect(301, '/projects');
}

function getProjects(req, res) {
  render(res, 'projects', {
    pageTitle: 'Projects'
  });
}

function getAbout(req, res) {
  render(res, 'about', {
    pageTitle: 'About William Youmans'
  });
}
