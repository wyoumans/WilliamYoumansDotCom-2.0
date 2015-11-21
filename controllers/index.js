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

  models.Image.findOne({}, 'postDate href src', {
    sort: {
      postDate: -1
    }
  }, function(err, image) {
    models.Tweet.find({}, 'tweetDate href content', {
      sort: {
        tweetDate: -1
      },
      limit: 3
    }, function(err, tweets) {
      locals.footerContent = {};

      if (image) {
        image.date_formatted = moment(image.postDate).fromNow();
        locals.footerContent.image = image;
      }

      if (tweets) {
        locals.footerContent.tweets = [];

        tweets.forEach(function(tweet) {
          tweet.date_formatted = moment(tweet.tweetDate).fromNow();
          tweet.username = config.twitter.username;
          locals.footerContent.tweets.push(tweet);
        });
      }

      locals.showMastHead = true;
      locals.showFooterMedia = true;

      render(res, 'home', locals);
    });
  });
}

function getProjects(req, res) {
  render(res, 'projects', {
    pageTitle: 'Projects',
    metaDescription: 'See a showcase of recent projects completed by William Youmans, freelance website developer in Charlotte, North Carolina.'
  });
}

function getAbout(req, res) {
  render(res, 'about', {
    pageTitle: 'About',
    metaDescription: 'Learn about the services of freelance website developer and consultant, William Youmans.'
  });
}
