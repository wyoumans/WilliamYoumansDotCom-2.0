'use strict';

var config = require('../config')
  , render = require('../lib').render
  ;

module.exports.init = function(app) {
  app.get('/contact', getContact);
  app.post('/contact', postContact);
};

function getContact(req, res) {
  render(res, 'generic', {
    pageTitle: 'Request a Quote'
  });
}

function postContact(req, res) {
  render(res, 'generic', {
    pageTitle: 'Request a Quote'
  });
}
