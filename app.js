'use strict';

var express        = require('express')
  , conductor      = require('express-conductor')
  , http           = require('http')
  , path           = require('path')
  , favicon        = require('static-favicon')
  , methodOverride = require('method-override')
  , morgan         = require('morgan')  // for logging to the console
  , logger         = require('./lib').logger
  , middleware     = require('./middleware')
  , config         = require('./config')
  , models         = require('./models') // register models (don't remove even if not used in this file!)
  , cronJobs       = require('./lib').cronJobs
  , app            = express()
  ;

/*
  PLEASE NOTE: The order of the following calls matters! Adjust at your own risk.
 */

app.enable('trust proxy');

// default locals
app.locals.NODE_ENV = config.env;
app.locals.useMinifiedAssets = config.useMinifiedAssets;
app.locals.analytics = config.analytics;
app.locals.bodyClass = '';
app.locals.metaDescription = 'William Youmans is a freelance web developer, avid oudoorsman, and tea enthusiast living in Salt Lake City, Utah.';
app.locals.metaKeywords = 'Freelance Developer, Software Development, Salt Lake City, Utah, professional';
app.locals.browserTitle = 'William Youmans | Freelance Web Development, Salt Lake City, Utah';
app.locals.showMastHead = false;
app.locals.showFooterMedia = false;

if (['local', 'testing'].indexOf(config.env) !== -1) {
  app.use(morgan('dev'));
}

app.set('port', config.port);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(methodOverride());

// check for 301 redirects
app.use(middleware.redirects());

// set cache headers
app.use(middleware.cacheControl());

app.use(express.static(path.join(__dirname, 'public'), {
  redirect: false
}));

if (['staging', 'production'].indexOf(config.env) !== -1) {
  cronJobs.start();
  app.use(middleware.errorHandler());
}

conductor.init(app, {
  controllers: __dirname + '/controllers'
}, function(err, app) {

  app.get('*', function(req, res) {
    logger.warn('404: ' + req.url);
    return res.status(404).render('errors/404');
  });

  http.createServer(app).listen(app.get('port'), function() {
    logger.info('Express server listening on port ' + app.get('port'));
  });
});
