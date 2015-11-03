'use strict';

var render = require('../lib').render
  ;

module.exports.init = function(app) {
  app.get('/sitemap.xml', getSitemap);
};

function getSitemap(req, res) {

  // all existing pages
  var pages = [
    '',
    '/projects',
    '/about',
    '/contact',
    '/blog/detail/part-1-interactive-javascript-map-of-canada-with-raphael'
  ];

  // services pages
  var services = [];

  if(res.locals.footerNavigation.left && res.locals.footerNavigation.left.length) {
    services = services.concat(res.locals.footerNavigation.left);
  }

  if(res.locals.footerNavigation.right && res.locals.footerNavigation.right.length) {
    services = services.concat(res.locals.footerNavigation.right);
  }

  services.forEach(function(service) {
    pages.push(service.href);
  });

  res.setHeader('Content-Type', 'application/xhtml+xml');

  render(res, 'sitemap', {
    baseURL: req.protocol + '://' + req.get('host'),
    pages: pages
  });
}
