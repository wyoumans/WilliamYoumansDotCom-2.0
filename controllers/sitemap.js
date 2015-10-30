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
    '/blog/detail/part-1-interactive-javascript-map-of-canada-with-raphael',

    // SEO pages
    '/charlotte-startup-consulting',
    '/responsive-website-development',
    '/hand-crafted-website-development',
    '/charlotte-north-carolina-web-development-services',
    '/custom-web-applications',
    '/php-laravel-development',
    '/custom-wordpress-themes',
    '/node-js-custom-web-application-development',
    '/php-laravel-development',
    '/custom-ecommerce-solutions',
    '/north-carolina-website-consulting',
    '/small-business-marketing-websites'
  ];

  res.setHeader('Content-Type', 'application/xhtml+xml');

  render(res, 'sitemap', {
    baseURL: req.protocol + '://' + req.get('host'),
    pages: pages
  });
}
