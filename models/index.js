'use strict';

var fs         = require('fs')
  , Mongoose   = require('mongoose')
  , timeStamps = require('mongoose-createdmodified').createdModifiedPlugin
  , config     = require('../config')
  , capitalize = require('string-capitalize')
  , models     = {}
  ;

Mongoose.connect(config.mongoConnectionString);

(function() {

  var files = fs.readdirSync(__dirname);

  files.forEach(function(file) {

    var fullPath = __dirname + '/' + file;

    if (/\.js$/.test(file) && file !== 'index.js') {
      var filename = file.replace(/\.js$/, '');

      var name = filename.split('-').map(function(word) {
        return capitalize(word);
      }).join('');

      var schema = require(fullPath);

      schema.plugin(timeStamps, {
        index: true
      });

      models[name] = Mongoose.model(name, schema);
    }
  });
}());

module.exports = models;
