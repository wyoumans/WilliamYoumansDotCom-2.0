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
    models.Tweet.findOne({}, 'tweetDate href content', {
      sort: {
        tweetDate: -1
      }
    }, function(err, tweet) {
      locals.footerContent = {};

      if (track) {
        track.date_formatted = moment(track.scrobbleDate).fromNow();
        locals.footerContent.track = track;
      }

      if (image) {
        image.date_formatted = moment(image.postDate).fromNow();
        locals.footerContent.image = image;
      }

      if (tweet) {
        tweet.date_formatted = moment(tweet.tweetDate).fromNow();
        locals.footerContent.tweet = tweet;
      }

      locals.showMastHead = true;
      locals.showFooterMedia = true;

      render(res, 'home', locals);
    });
  });});
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
