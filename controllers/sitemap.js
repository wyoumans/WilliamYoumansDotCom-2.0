'use strict';

var render = require('../lib').render
  , config = require('../config')
  , models = require('../models')
  ;

module.exports.init = function(app) {
  app.get('/sitemap.xml', getSitemap);
};

function getSitemap(req, res) {

  // all existing pages
  var pages = [{
    url: '',
    priority: '1.0'
  }, {
    url: '/projects',
    priority: '0.9'
  }, {
    url: '/services',
    priority: '0.9'
  }, {
    url: '/about',
    priority: '0.9'
  }, {
    url: '/contact',
    priority: '0.9'
  }, {
    url: '/blog',
    priority: '0.9'
  }];

  // services pages
  var services = [];

  if (res.locals.footerNavigation.left && res.locals.footerNavigation.left.length) {
    services = services.concat(res.locals.footerNavigation.left);
  }

  if (res.locals.footerNavigation.right && res.locals.footerNavigation.right.length) {
    services = services.concat(res.locals.footerNavigation.right);
  }

  services.forEach(function(service) {
    pages.push({
      url: service.href,
      priority: '0.8'
    });
  });

  // blog posts
  models.Post.find({}, 'slug', {
    sort: {
      publishedAt: -1
    }
  }, function(err, posts) {

    if (!err && posts) {
      posts.forEach(function(post) {
        pages.push({
          url: '/' + config.postsBase + '/' + post.slug,
          priority: '0.5'
        });
      });
    }

    res.setHeader('Content-Type', 'application/xml');

    render(res, 'sitemap', {
      baseURL: (req.secure ? 'https' : 'http' ) + '://' + req.get('host'),
      pages: pages
    });
  });
}
