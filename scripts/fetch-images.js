'use strict';

var ig     = require('instagram-node').instagram()
  , config = require('../config')
  , Image  = require('../models').Image
  , async  = require('async')
  , _      = require('lodash')
  ;

(function() {

  console.log();
  console.log('============ Beginning Instagram Import ============');

  ig.use({
    // client_id: config.instagram.key,
    // client_secret: config.instagram.secret,
    access_token: config.instagram.token
  });

  ig.user_media_recent(config.instagram.userid, function(err, medias, pagination, limit) {
    if (medias && medias.length > 0) {

      console

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
          console.error(err);
        }

        console.log();
        console.log('============ Instagram Import Complete ============');
        process.exit();
      });
    }
  });
})();
