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
    pageTitle: 'Request a Quote'
  });
}

function postContact(req, res) {
  var formIsValid = false
    , formValues = req.body.contact
    ;

  var lead = new models.Lead({
    name: values.name,
    email: values.email,
    message: values.message
  });

  lead.save(function(err) {
    if (err) {
      return res.redirect('/contact'); // prevent serving a cached version of this page
    } else {
      var locals = {
        name: 'William Youmans',
        email: 'will@williamyoumans.com',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt consequat sapien, at cursus elit aliquam ut. Praesent ullamcorper felis nec lorem gravida, ullamcorper sagittis ante viverra. Maecenas magna justo, facilisis vitae diam varius, porta gravida dui. Ut euismod nisl vel purus feugiat ornare. Proin augue orci, aliquet sed vestibulum vel, pretium sit amet sapien. Curabitur iaculis elit sed lorem consectetur, eget congue nisl tempor. Pellentesque sed justo euismod, convallis orci ac, gravida turpis. Vivamus in est nec mi rhoncus aliquam. Sed congue feugiat elit non ultricies.'
      };

      locals.host = req.get('host');

      sendgrid.send({
        from: config.serverEmail,
        to: config.adminEmail,
        replyto: locals.email,
        subject: 'Contact request from: ' + locals.name,
        html: getEmailHTML('contact', locals),
        text: getEmailText('contact', locals)
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
  render(res, 'generic', {
    pageTitle: 'Thank You'
  });
}
