'use strict';

var config       = require('../config')
  , models       = require('../models')
  , lib          = require('../lib')
  , render       = lib.render
  , logger       = lib.logger
  , getEmailHTML = lib.getEmailHTML
  , getEmailText = lib.getEmailText
  , sendgrid     = require('sendgrid')(config.sendgrid.apikey)
  ;

module.exports.init = function(app) {
  app.get('/contact', getContact);
  app.post('/contact', postContact);

  app.get('/thank-you', getThankYou);
};

function getContact(req, res) {
  var wantsConsultation = req.query.consultation == '1';
  var metaDescription = 'Contact the freelance developer for a free quote and website consultation.';
  var preMessage = '';

  if(wantsConsultation) {
    preMessage = "Hi Will,\n\nPlease contact me ASAP for a free 1/2 hour consultation! \n\n(tell me more about your project here...)";
  }

  render(res, 'contact', {
    pageTitle: 'Request a Quote',
    showFooterCTA: false,
    metaDescription: metaDescription,
    preMessage: preMessage
  });
}

function postContact(req, res) {
  var formIsValid = false
    , formValues  = req.body.contact;

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

      var mailHelper = require('sendgrid').mail;
      var from_email = new mailHelper.Email(config.serverEmail);
      var to_email = new mailHelper.Email(config.adminEmail);
      var subject = 'Contact request from: ' + lead.name;

      var textContent = new mailHelper.Content("text/plain", getEmailText('contact', lead));
      var htmlContent = new mailHelper.Content("text/html", getEmailHTML('contact', lead));

      var mail = new mailHelper.Mail(from_email, subject, to_email, textContent);
      mail.addContent(htmlContent);

      var reply_email = new mailHelper.Email(lead.email)
      mail.setReplyTo(reply_email);

      var request = sendgrid.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
      });

      sendgrid.API(request, function(err, response) {
        if (err) {
          logger.error(err);
        }

        return res.redirect('/thank-you');
      });
    }
  });
}

function getThankYou(req, res) {
  // facebook conversion tracker
  var facebookConversionTracker = "<script>(function() {var _fbq = window._fbq || (window._fbq = []);if (!_fbq.loaded) {var fbds = document.createElement('script');fbds.async = true;fbds.src = '//connect.facebook.net/en_US/fbds.js';var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(fbds, s);_fbq.loaded = true;}})();window._fbq = window._fbq || [];window._fbq.push(['track', '6015739440433', {'value':'0.01','currency':'USD'}]);</script><noscript><img height='1' width='1' alt='' style='display:none' src='https://www.facebook.com/tr?ev=6015739440433&amp;cd[value]=0.01&amp;cd[currency]=USD&amp;noscript=1' /></noscript>";

  render(res, 'thanks', {
    pageTitle: 'Thank You',
    showFooterCTA: false,
    headerJS: config.env == 'production' ? facebookConversionTracker : false
  });
}
