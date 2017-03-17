'use strict';

var logger    = require('../lib').logger
  , services  = require('./data/services')
  , Service   = require('../models').Service
  , resources = require('./data/resources')
  , Resource  = require('../models').Resource
  , async     = require('async')
  , mongoose  = require('mongoose')
  ;

(function() {

  logger.info('Beginning Services Import');

  var resourcesBySlug = {};
  resources.forEach(function(resource) {
    resourcesBySlug[resource.slug] = resource;
  });

  mongoose.connection.collections['services'].drop(function(err) {
    mongoose.connection.collections['resources'].drop(function(err) {
      logger.info('Services dropped');

      async.each(services, function(service, done) {
        logger.info('Service: inserting ' + service.slug);

        new Service(service).save(function(err) {
          if (service.resourceSlug && resourcesBySlug.hasOwnProperty(service.resourceSlug)) {
            var resource = resourcesBySlug[service.resourceSlug];


            logger.info('Resource: inserting ' + resource.slug);

            // ensure slug is right
            resource.serviceSlug = service.slug;
            new Resource(resource).save(done);
          } else {
            return done(err);
          }
        });
      }, function(err) {
        if (err) {
          logger.error(err);
        }

        logger.info('Services Import Complete');
        process.exit();
      });
    });
  });
})();
