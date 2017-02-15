'use strict';

var assetsVersion = require('../lib/assets-version')
  , config        = require('../config')
  ;

module.exports = function() {
  return function(req, res, next) {

    res.locals.NODE_ENV = config.env;
    res.locals.useMinifiedAssets = config.useMinifiedAssets;
    res.locals.analytics = config.analytics;
    res.locals.hotjarid = config.hotjarid;
    res.locals.showAnalytics = config.showAnalytics;
    res.locals.showHotjar = config.showHotjar;
    res.locals.assetsVersion = assetsVersion;
    res.locals.supportsCaching = config.supportsCaching;
    res.locals.bodyClass = '';
    res.locals.metaDescription = 'Discover how a professional freelance web developer in NEPA, Wilkes-Barre, Scranton, Hazelton, Philadelphia Pennsylvania can improve your website to boost your profits.';
    res.locals.browserTitle = 'Freelance Laravel, Wordress, and Node.js Developer | Wilkes-Barre, Pennsylvania | William Youmans';
    res.locals.showMastHead = false;
    res.locals.showFooterMedia = false;
    res.locals.showFooterCTA = true;
    res.locals.headerJS = false;
    res.locals.twitterId = config.twitter.id;

    var hour = new Date().getHours();

    // day is between 6AM and 7PM
    res.locals.isDay = (hour > 6) && (hour < 19);
    next();
  };
};
