'use strict';

var config       = require('../config')
  , models       = require('../models')
  , lib          = require('../lib')
  , render       = lib.render
  , logger       = lib.logger
  , getEmailHTML = lib.getEmailHTML
  , getEmailText = lib.getEmailText
  , sendgrid     = require('sendgrid')(config.sendgrid.user, config.sendgrid.key)
  ;

module.exports.init = function(app) {
  app.get('/contact', getContact);
  app.post('/contact', postContact);

  app.get('/thank-you', getThankYou);
};

function getContact(req, res) {
  render(res, 'contact', {
    pageTitle: 'Request a Quote',
    showFooterCTA: false
  });
}

function postContact(req, res) {
  var formIsValid = false
    , formValues = req.body.contact
    ;

  var lead = new models.Lead({
    name: formValues.name,
    email: formValues.email,
    message: formValues.message,
    host: req.get('host')
  });

  lead.save(function(err, lead) {
    if (err) {
      return res.redirect('/contact'); // prevent serving a cached version of this page
    } else {
      sendgrid.send({
        from: config.serverEmail,
        to: config.adminEmail,
        replyto: lead.email,
        subject: 'Contact request from: ' + lead.name,
        html: getEmailHTML('contact', lead),
        text: getEmailText('contact', lead)
      }, function(err, response) {
        if (err) {
          logger.err(err);
        }

        return res.redirect('/thank-you');
      });
    }
  });
}

function getThankYou(req, res) {
  render(res, 'thanks', {
    pageTitle: 'Thank You',
    showFooterCTA: false
  });
}
