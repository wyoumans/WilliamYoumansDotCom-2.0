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
app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('mkn4xtk8xen9fixn0m9m'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.configure('local', function() {
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