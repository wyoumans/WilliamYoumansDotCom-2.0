'use strict';

var config   = require('../config')
  , render   = require('../lib').render
  , throw404 = require('../middleware').throw404
  , Post     = require('../models').Post
  ;

module.exports.init = function(app) {
  app.get('/blog', getBlog);
  app.get('/blog/detail/part-1-interactive-javascript-map-of-canada-with-raphael', getPost);
};

function getBlog(req, res) {
  Post.find({}, 'title excerpt tags slug publishedAt', {
    sort: {
      publishedAt: -1
    },
    limit: 4
  }, function(err, posts) {
    render(res, 'blog', {
      pageTitle: 'Blog',
      metaDescription: 'The technical blog of Pennsylvania based website programmer, William Youmans',
      posts: posts,
      postsBase: config.postsBase
    });
  });
}

function getPost(req, res) {
  render(res, 'post', {
    pageTitle: 'Interactive Javascript map of Canada with Raphaël',
    metaDescription: 'How to build an interactive map of Canada in pure Javacscript using Raphaël.js by William Youmans, a freelance web developer'
  });
}
