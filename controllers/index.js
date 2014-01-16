'use strict';

var config = require('../config')
  ;

module.exports.init = function(app) {
  app.get('/', index);
  app.get('/portfolio', portfolio);
  app.get('/services', services);
  app.get('/blog', blog);
  app.get('/about', about);
  app.get('/contact', contact);
};

function index(req, res) {
  res.render('home', {
    showMastHead: true
  });
}

function portfolio(req, res) {
  res.render('generic', {
    pageTitle: 'Portfolio'
  });
}

function services(req, res) {
  res.render('generic', {
    pageTitle: 'Services'
  });
}

function blog(req, res) {
  res.render('generic', {
    pageTitle: 'Blog'
  });
}

function about(req, res) {
  res.render('generic', {
    pageTitle: 'About William'
  });
}

function contact(req, res) {
  res.render('generic', {
    pageTitle: 'Request a Quote'
  });
}
