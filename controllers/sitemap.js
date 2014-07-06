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

  res.setHeader('Content-Type', 'application/xhtml+xml');

  render(res, 'sitemap', {
    baseURL: req.protocol + '://' + req.get('host'),
    pages: pages
  });
}
