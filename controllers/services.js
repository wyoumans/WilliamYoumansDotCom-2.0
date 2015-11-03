'use strict';

var config = require('../config')
  , render = require('../lib').render
  , models = require('../models')
  ;

module.exports.init = function(app) {
  app.get('/services/*', getServices);
};

function getServices(req, res) {
  render(res, 'services', {
    pageTitle: 'Services',
    metaDescription: 'Services?'
  });
}
