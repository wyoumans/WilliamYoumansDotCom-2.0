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
    res.locals.metaDescription = 'William Youmans is a Charlotte, North Carolina based freelance web developer, technical project manager, software consultant, avid oudoorsman, and tea enthusiast.';
    res.locals.metaKeywords = 'Charlotte, North Carolina, Freelance Developer, Software Development, Software Consulting, Project Management, professional';
    res.locals.browserTitle = 'Charlotte, North Carolina Freelance Web Software Developer and Consultant | William Youmans';
    res.locals.showMastHead = false;
    res.locals.showFooterMedia = false;
    res.locals.showFooterCTA = true;
    res.locals.headerJS = false;
    res.locals.twitterId = config.twitter.id;

    next();
  };
};
