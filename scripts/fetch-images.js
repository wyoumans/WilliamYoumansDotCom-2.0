'use strict';

var Instagram = require('instagram-node-ib')
  , config    = require('../config')
  , Image     = require('../models').Image
  , async     = require('async')
  , _         = require('lodash')
  ;

(function() {

  console.log();
  console.log('============ Beginning Instagram Import ============');

  Instagram.set('client_id', config.instagram.key);
  Instagram.set('client_secret', config.instagram.secret);
  Instagram.set('access_token', config.instagram.token);

  console.log(Instagram.users.recent({
    user_id: config.instagram.userid
  }));

  console.log();
  console.log('============ Instagram Import Complete ============');
  process.exit();
})();
