'use strict';

var assetsVersion = require('../lib/assets-version')
  , config        = require('../config')
  ;

module.exports = function() {
  return function(req, res, next) {

    res.locals.NODE_ENV = config.env;
    res.locals.useMinifiedAssets = config.useMinifiedAssets;
    res.locals.analytics = config.analytics;
    res.locals.showAnalytics = config.showAnalytics;
    res.locals.assetsVersion = assetsVersion;
    res.locals.supportsCaching = config.supportsCaching;
    res.locals.bodyClass = '';
    res.locals.metaDescription = 'Discover how a professional freelance web developer in Charlotte, NC can improve your website so you get more conversions.';
    res.locals.browserTitle = 'Freelance Laravel, Wordpress, and Node.js Developer | William Youmans';
    res.locals.showMastHead = false;
    res.locals.showFooterMedia = false;
    res.locals.showFooterCTA = true;
    res.locals.headerJS = false;
    res.locals.twitterId = config.twitter.id;

    next();
  };
};
