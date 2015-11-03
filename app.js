'use strict';

var express        = require('express')
  , conductor      = require('express-conductor')
  , http           = require('http')
  , path           = require('path')
  , favicon        = require('serve-favicon')
  , bodyParser     = require('body-parser')
  , methodOverride = require('method-override')
  , morgan         = require('morgan')  // for logging to the console
  , lib            = require('./lib')
  , middleware     = require('./middleware')
  , config         = require('./config')
  , models         = require('./models') // register models (don't remove even if not used in this file!)
  , app            = express()
  ;

/*
  PLEASE NOTE: The order of the following calls matters! Adjust at your own risk.
 */

app.enable('trust proxy');

// default locals (can be overwritten in the controller)
app.locals.NODE_ENV = config.env;
app.locals.useMinifiedAssets = config.useMinifiedAssets;
app.locals.analytics = config.analytics;
app.locals.showAnalytics = config.showAnalytics;
app.locals.assetsVersion = lib.assetsVersion;
app.locals.supportsCaching = config.supportsCaching;
app.locals.bodyClass = '';
app.locals.metaDescription = 'William Youmans is a Charlotte, North Carolina based freelance web developer, technical project manager, software consultant, avid oudoorsman, and tea enthusiast.';
app.locals.metaKeywords = 'Charlotte, North Carolina, Freelance Developer, Software Development, Software Consulting, Project Management, professional';
app.locals.browserTitle = 'Charlotte, North Carolina Freelance Web Software Developer and Consultant | William Youmans';
app.locals.showMastHead = false;
app.locals.showFooterMedia = false;
app.locals.showFooterCTA = true;
app.locals.headerJS = false;
app.locals.twitterId = config.twitter.id;

if (['development', 'testing'].indexOf(config.env) !== -1) {
  app.use(morgan('dev'));
}

app.set('port', config.port);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());

// check for 301 redirects
app.use(middleware.redirects());

app.use(middleware.cleanUrl());

// set cache headers
app.use(middleware.cacheControl());

app.use(express.static(path.join(__dirname, 'public'), {
  redirect: false
}));

if (['staging', 'production'].indexOf(config.env) !== -1) {
  lib.cronJobs.start();
  app.use(middleware.errorHandler());
}

conductor.init(app, {
  controllers: __dirname + '/controllers'
}, function(err, app) {

  app.get('*', function(req, res) {
    lib.logger.warn('404: ' + req.url);
    return res.status(404).render('errors/404');
  });

  http.createServer(app).listen(app.get('port'), function() {
    lib.logger.info('Express server listening on port ' + app.get('port'));
  });
});
