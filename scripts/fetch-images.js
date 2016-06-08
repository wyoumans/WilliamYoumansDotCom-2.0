'use strict';

var ig     = require('instagram-node').instagram()
  , config = require('../config')
  , logger = require('../lib').logger
  , Image  = require('../models').Image
  , async  = require('async')
  , _      = require('lodash')
  ;

(function() {

  logger.info('Beginning Instagram Import');

  ig.use({
    client_id: config.instagram.key,
    client_secret: config.instagram.secret
  });

  ig.user_media_recent(config.instagram.userid, function(err, medias, pagination, limit) {
    if (medias && medias.length > 0) {

      async.each(medias, function(media, done) {
        var image = {
          instid: media.id,
          href: media.link,
          src: media.images.low_resolution.url,
          postDate: new Date(0).setUTCSeconds(media.created_time)
        }

        new Image(image).save(function(err) {

          // prevent db errors from stopping the script
          done(null);
        });
      }, function(err) {
        if (err) {
          logger.error(err);
        }

        logger.info('Instagram Import Complete');
        process.exit();
      });
    } else {
      if (err) {
        logger.error(err);
      }

      logger.info('Instagram Import Complete');
      process.exit();
    }
  });
})();
