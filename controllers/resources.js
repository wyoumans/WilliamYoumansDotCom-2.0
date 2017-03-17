'use strict';

var config   = require('../config')
  , render   = require('../lib').render
  , throw404 = require('../middleware').throw404
  , Resource  = require('../models').Resource
  ;

module.exports.init = function(app) {
  app.get('/' + config.resourcesBase + '/:slug', getResource);
};

function getResource(req, res) {

  Resource.findOne({
    slug: req.params.slug
  }, 'title description image copy bullets serviceSlug', function(err, resource) {
    if (resource) {
      render(res, 'resource', {
        pageTitle: resource.title,
        metaDescription: resource.description,
        resource: resource,
        relatedService: '/' + config.servicesBase + '/' + resource.serviceSlug
      });
    } else {
      return throw404(req, res);
    }
  });
}
