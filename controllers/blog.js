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
    pageTitle: 'Blog'
  });
}

function getPost(req, res) {
  render(res, 'post', {
    pageTitle: 'Part 1: Interactive Javascript map of Canada with Raphaël'
  });
}
