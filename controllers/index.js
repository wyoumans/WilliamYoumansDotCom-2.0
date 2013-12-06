'use strict';

var config = require('../config')
  , globals = require('../middleware').globals
  ;

module.exports.init = function(app) {
  app.get('/', globals, index);
  app.get('/portfolio', globals, portfolio);
  app.get('/services', globals, services);
  app.get('/blog', globals, blog);
  app.get('/about', globals, about);
  app.get('/contact', globals, contact);
};

function index(req, res) {
  res.render('index', {
    title: 'Home'
  });
}

function portfolio(req, res) {
  res.render('generic', {
    title: 'Portfolio'
  });
}

function services(req, res) {
  res.render('generic', {
    title: 'Services'
  });
}

function blog(req, res) {
  res.render('generic', {
    title: 'Blog'
  });
}

function about(req, res) {
  res.render('generic', {
    title: 'About William'
  });
}

function contact(req, res) {
  res.render('generic', {
    title: 'Request a Quote'
  });
}
