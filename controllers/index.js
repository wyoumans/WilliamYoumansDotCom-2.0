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
