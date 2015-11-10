'use strict';

var config = require('../config')
  , render = require('../lib').render
  , throw404 = require('../middleware').throw404
  , Service = require('../models').Service
  ;

module.exports.init = function(app) {
  app.get('/' + config.servicesBase + '/:slug', getServices);
};

function getServices(req, res) {

  Service.findOne({
    slug: req.params.slug
  }, 'title image copy cases', function(err, service) {
    if (service) {
      render(res, 'services', {
        pageTitle: service.title,
        metaDescription: service.title + ' by William Youmans freelance web developer in Charlotte, North Carolina',
        service: service
      });
    } else {
      return throw404(req, res);
    }
  });
}