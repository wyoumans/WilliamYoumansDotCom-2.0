'use strict';

var config = require('../config')
  , render = require('../lib').render
  ;

module.exports.init = function(app) {
  app.get('/', getHome);
  app.get('/portfolio', getPortfolio);
  app.get('/services', getServices);
  app.get('/blog', getBlog);
  app.get('/about', getAbout);
};

function getHome(req, res) {
  render(res, 'home', {
    showMastHead: true,
    showFooterMedia: true
  });
}

function getPortfolio(req, res) {
  render(res, 'generic', {
    pageTitle: 'Portfolio'
  });
}

function getServices(req, res) {
  render(res, 'generic', {
    pageTitle: 'Services'
  });
}

function getBlog(req, res) {
  render(res, 'generic', {
    pageTitle: 'Blog'
  });
}

function getAbout(req, res) {
  render(res, 'generic', {
    pageTitle: 'About William'
  });
}
