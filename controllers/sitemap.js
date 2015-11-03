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

    // services pages
    '/services/charlotte-startup-consulting',
    '/services/responsive-website-development',
    '/services/hand-crafted-website-development',
    '/services/charlotte-north-carolina-web-development-services',
    '/services/custom-web-applications',
    '/services/php-laravel-development',
    '/services/content-management-systems',
    '/services/custom-wordpress-themes',
    '/services/node-js-custom-web-application-development',
    '/services/woocommerce-store-development',
    '/services/custom-ecommerce-solutions',
    '/services/north-carolina-website-consulting',
    '/services/small-business-marketing-websites',
    '/services/subscription-membership-systems'
  ];

  res.setHeader('Content-Type', 'application/xhtml+xml');

  render(res, 'sitemap', {
    baseURL: req.protocol + '://' + req.get('host'),
    pages: pages
  });
}
