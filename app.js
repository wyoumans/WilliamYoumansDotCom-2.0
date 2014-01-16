'use strict';

var express    = require('express')
  , conductor  = require('express-conductor')
  , http       = require('http')
  , path       = require('path')
  , logger     = require('./lib').logger
  , middleware = require('./middleware')
  , config     = require('./config')
  , models     = require('./models') // register models
  , app        = express()
  ;

/*
  PLEASE NOTE: The order of the following calls matters! Adjust at your own risk.
 */

app.enable('trust proxy');

// default locals
app.locals({
  NODE_ENV: config.env,
  bodyClass: '',
  metaDescription: 'William Youmans is a software developer, avid oudoorsman, and tea enthusiast living in Salt Lake City, Utah.',
  metaKeywords: 'Freelance Developer, Software Development, Salt Lake City, Utah, professional',
  browserTitle: 'William Youmans | Freelance Web Development, Salt Lake City, Utah',
  showMastHead: false,
  showFooterMedia: false,
});

app.configure('local', function() {
  app.use(express.logger('dev'));
});

app.configure('testing', function() {
  app.use(express.logger('dev'));
});

app.configure(function() {
  app.set('port', config.port);

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(express.favicon(__dirname + '/public/favicon.ico'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());

  app.use(express.static(path.join(__dirname, 'public'), {
    redirect: false
  }));

  app.use(middleware.globals);
  app.use(app.router);
});

app.configure('staging', function() {
  app.use(middleware.errorHandler());
});

app.configure('production', function() {
  app.use(middleware.errorHandler());
});

conductor.init(app, {
  controllers: __dirname + '/controllers'
}, function(err, app) {

  app.get('*', function(req, res) {
    logger.error('404: ' + req.url);
    return res.status(404).render('errors/404');
  });

  http.createServer(app).listen(app.get('port'), function() {
    logger.info('Express server listening on port ' + app.get('port'));
  });
});
