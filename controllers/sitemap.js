'use strict';

var render = require('../lib').render
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
    url: '/about',
    priority: '0.9'
  }, {
    url: '/contact',
    priority: '0.9'
  }, {
    url: '/blog',
    priority: '0.9'
  }, {
    url: '/blog/detail/part-1-interactive-javascript-map-of-canada-with-raphael',
    priority: '0.5'
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

  res.setHeader('Content-Type', 'application/xhtml+xml');

  render(res, 'sitemap', {
    baseURL: req.protocol + '://' + req.get('host'),
    pages: pages
  });
}
