'use strict';

var config   = require('../config')
  , render   = require('../lib').render
  , throw404 = require('../middleware').throw404
  , Post     = require('../models').Post
  ;

module.exports.init = function(app) {
  app.get('/blog', getBlog);
  app.get('/' + config.postsBase + '/:slug', getPost);
};

function getBlog(req, res) {

  Post.find({
    publishedAt: {
      "$lt": new Date()
    }
  }, 'title excerpt tags slug publishedAt', {
    sort: {
      publishedAt: -1
    },
    limit: 4
  }, function(err, posts) {
    render(res, 'posts', {
      pageTitle: 'Blog',
      metaDescription: 'The technical blog of Pennsylvania based website programmer, William Youmans',
      posts: posts,
      postsBase: config.postsBase
    });
  });
}

function getPost(req, res) {

  Post.findOne({
    slug: req.params.slug,
    publishedAt: {
      "$lt": new Date()
    }
  }, 'slug title copy gistURL demoURL tags metaDescription publishedAt', function(err, post) {
    if (post) {
      render(res, 'post', {
        pageTitle: post.title,
        metaDescription: post.metaDescription,
        post: post
      });
    } else {
      return throw404(req, res);
    }
  });
}
