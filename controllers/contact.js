'use strict';

var config       = require('../config')
  , models       = require('../models')
  , lib          = require('../lib')
  , render       = lib.render
  , logger       = lib.logger
  , getEmailHTML = lib.getEmailHTML
  , getEmailText = lib.getEmailText
  , sendgrid     = require('sendgrid')(config.sendgrid.user, config.sendgrid.key)
  , MailChimpAPI = require('mailchimp').MailChimpAPI
  ;

module.exports.init = function(app) {
  app.get('/contact', getContact);
  app.post('/contact', postContact);

  app.get('/thank-you', getThankYou);
};

function getContact(req, res) {
  render(res, 'contact', {
    pageTitle: 'Request a Quote',
    showFooterCTA: false,
    metaDescription: 'Contact William Youmans for a free quote. He is a freelance web developer, technical project manager, software consultant, avid oudoorsman, and tea enthusiast living in Charlotte, North Carolina.'
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
          logger.error(err);
        }

        if (req.body.optin && req.body.optin == '1') {
          try {
            var api = new MailChimpAPI(config.mailchimp.apikey, {
              version: '2.0'
            });

            api.call('lists', 'subscribe', {
              id: config.mailchimp.listid,
              email: {
                email: lead.email
              },
              merge_vars: {
                FNAME: lead.name
              }
            }, function(error, data) {
              if (error) {
                logger.error(error);
              } else {
                logger.info(data);
              }

              return res.redirect('/thank-you');
            });
          } catch (error) {
            logger.error(error);
            return res.redirect('/thank-you');
          }
        } else {
          return res.redirect('/thank-you');
        }
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
