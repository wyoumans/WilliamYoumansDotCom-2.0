'use strict';

var config = require('../config')
  , render = require('../lib').render
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
  render(res, 'home', {
    showMastHead: true
  });
}

function portfolio(req, res) {
  render(res, 'generic', {
    pageTitle: 'Portfolio'
  });
}

function services(req, res) {
  render(res, 'generic', {
    pageTitle: 'Services'
  });
}

function blog(req, res) {
  render(res, 'generic', {
    pageTitle: 'Blog'
  });
}

function about(req, res) {
  render(res, 'generic', {
    pageTitle: 'About William'
  });
}

function contact(req, res) {
  render(res, 'generic', {
    pageTitle: 'Request a Quote'
  });
}
