'use strict';

var render = require('../lib').render
  , models = require('../models')
  ;

module.exports.init = function(app) {
  // app.get('/blog', getBlog);
  app.get('/blog/detail/part-1-interactive-javascript-map-of-canada-with-raphael', getPost);
};

function getBlog(req, res) {
  render(res, 'generic', {
    pageTitle: 'Blog',
    metaDescription: 'William Youmans Blog: a freelance web developer, technical project manager, software consultant, avid oudoorsman, and tea enthusiast living in Charlotte, North Carolina.'
  });
}

function getPost(req, res) {
  render(res, 'post', {
    pageTitle: 'Interactive Javascript map of Canada with Raphaël',
    metaDescription: 'How to build an interactive map of Canada in pure Javacscript using Raphaël.js'
  });
}
