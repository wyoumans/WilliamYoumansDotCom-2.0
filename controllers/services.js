'use strict';

var config   = require('../config')
  , render   = require('../lib').render
  , throw404 = require('../middleware').throw404
  , Service  = require('../models').Service
  ;

module.exports.init = function(app) {
  app.get('/' + config.servicesBase, getServices);
  app.get('/' + config.servicesBase + '/:slug', getService);
};

function getServices(req, res) {

  Service.find({
    showOnServicesIndex: true
  }, 'title slug excerpt icon', {
    sort: {
      sort: 1
    }
  }, function(err, services) {
    render(res, 'services', {
      pageTitle: 'Services',
      metaDescription: 'Freelance web development services available from William Youmans, consultant',
      services: services,
      servicesBase: config.servicesBase
    });
  });
}

function getService(req, res) {

  Service.findOne({
    slug: req.params.slug
  }, 'title image copy cases', function(err, service) {
    if (service) {
      render(res, 'service', {
        pageTitle: service.title,
        metaDescription: 'Learn about ' + service.title + ', a service provided by freelance web developer, William Youmans',
        service: service,
        relatedResource: '/' + config.resourcesBase + '/' + resource.resourceSlug
      });
    } else {
      return throw404(req, res);
    }
  });
}
