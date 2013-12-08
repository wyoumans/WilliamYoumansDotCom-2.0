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

  ig.use({ client_id: config.instagram.key, client_secret: config.instagram.secret });

  ig.user('cwyouman', function(err, result, limit) {

    console.log('err', err);
    console.log('result', result);
    console.log('limit', limit);

    console.log();
    console.log('============ Instagram Import Complete ============');
    process.exit();
  });

})();
