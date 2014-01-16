'use strict';

var express   = require('express')
  , conductor = require('express-conductor')
  , http      = require('http')
  , path      = require('path')
  , config    = require('./config')
  , models    = require('./models') // register models
  , app       = express()
  ;

app.enable('trust proxy');

app.locals({
  NODE_ENV: config.env
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

  app.use(app.router);
});

app.configure('local', function() {
  app.use(express.logger('dev'));
  app.use(express.errorHandler());
});

conductor.init(app, {
  controllers: __dirname + '/controllers'
}, function(err, app) {

  app.get('*', function(req, res) {
    return res.status(404).render('errors/404');
  });

  http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
  });
});
