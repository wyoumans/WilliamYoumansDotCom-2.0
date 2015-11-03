'use strict';

var Service = require('../models').Service;

module.exports = function() {
  return function(req, res, next) {

    Service.find({}, 'slug title column', {
      sort: {
        column: -1
      }
    }, function(err, services) {

      var footerNavigation = {
        left: [],
        right: []
      };

      if (services && services.length) {
        services.forEach(function(service) {
          service.href = '/services/' + service.slug;
          footerNavigation[service.column].push(service);
        });
      }

      res.locals.footerNavigation = footerNavigation;
      next();
    });
  };
};
