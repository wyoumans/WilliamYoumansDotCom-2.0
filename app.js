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

//
// PLEASE NOTE: The order of the following calls matters! Adjust at your own risk.
//

app.enable('trust proxy');

if (['development', 'testing'].indexOf(config.env) !== -1) {
  app.use(morgan('dev'));
}

app.set('port', config.port);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());

// check for 301 redirects
app.use(middleware.redirects());

// remove trailing slash
app.use(middleware.cleanUrl());

// set cache headers
app.use(middleware.cacheControl());

// handle static assets
app.use(express.static(path.join(__dirname, 'public'), {
  redirect: false
}));

// default locals (can be overwritten in the controller)
app.use(middleware.locals());

// build footer navigation
app.use(middleware.footerNavigation());
if (['staging', 'production'].indexOf(config.env) !== -1) {
  lib.cronJobs.start();
  app.use(middleware.errorHandler());
}

conductor.init(app, {
  controllers: __dirname + '/controllers'
}, function(err, app) {

  app.get('*', middleware.throw404);

  http.createServer(app).listen(app.get('port'), function() {
    lib.logger.info('Express server listening on port ' + app.get('port'));
  });
});
