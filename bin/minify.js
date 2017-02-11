'use strict';

var compressor = require('node-minify')
  , fs = require('fs')
  , async = require('async')
  , assetsVersion = require('../lib').assetsVersion;

var imagemin = require('imagemin')
  , imageminMozjpeg = require('imagemin-mozjpeg')
  , imageminPngquant = require('imagemin-pngquant')
  , imageminGifsicle = require('imagemin-gifsicle');

console.log();
console.log('Beginning minification');

async.series([
  deleteOldAssets,
  minifyCSS,
  minifyJS,
  minifyImages
], function(err, results) {
  if (err) {
    console.log(err);
  }
  console.log();
  console.log('Assets Version:', assetsVersion);
  console.log('Minification complete! Deploy at will.');
});

function deleteOldAssets(done) {
  var buildPath = __dirname + '/../public/build/';

  fs.readdir(buildPath, function(err, files) {

    files.forEach(function(file) {
      if (/\.min\./.test(file)) {
        fs.unlinkSync(buildPath + file);
      }
    });

    console.log('Old assets deleted');
    done();
  });
}

/**
 * Minifies the CSS
 * @param  Function done   Async callback
 */
function minifyCSS(done) {
  compressor.minify({
    compressor: 'yui-css',
    input: 'public/styles/styles.css',
    output: 'public/build/styles-' + assetsVersion + '.min.css',
    callback: function(err) {
      console.log('Styles minified');
      return done(err);
    }
  });
}

/**
 * Minifies the JS
 * @param  Function done   Async callback
 */
function minifyJS(done) {
  compressor.minify({
    compressor: 'uglifyjs',
    input: [
      // Libraries
      'public/bower_components/jquery/dist/jquery.js',
      'public/bower_components/jquery.easing/js/jquery.easing.js',
      'public/bower_components/snabbt.js/snabbt.js',
      // 'public/bower_components/jquery-placeholder/jquery.placeholder.js',
      'public/bower_components/jquery.cookie/jquery.cookie.js',
      'public/bower_components/fastclick/lib/fastclick.js',
      'public/bower_components/typed.js/js/typed.js',

      // Foundation Core (only include those that are used)
      'public/bower_components/foundation/js/foundation/foundation.js',
      'public/bower_components/foundation/js/foundation/foundation.abide.js',
      // 'public/bower_components/foundation/js/foundation/foundation.accordion.js',
      // 'public/bower_components/foundation/js/foundation/foundation.alert.js',
      // 'public/bower_components/foundation/js/foundation/foundation.clearing.js',
      // 'public/bower_components/foundation/js/foundation/foundation.dropdown.js',
      // 'public/bower_components/foundation/js/foundation/foundation.equalizer.js',
      // 'public/bower_components/foundation/js/foundation/foundation.interchange.js',
      // 'public/bower_components/foundation/js/foundation/foundation.joyride.js',
      // 'public/bower_components/foundation/js/foundation/foundation.magellan.js',
      // 'public/bower_components/foundation/js/foundation/foundation.offcanvas.js',
      // 'public/bower_components/foundation/js/foundation/foundation.orbit.js',
      // 'public/bower_components/foundation/js/foundation/foundation.reveal.js',
      // 'public/bower_components/foundation/js/foundation/foundation.slider.js',
      // 'public/bower_components/foundation/js/foundation/foundation.tab.js',
      // 'public/bower_components/foundation/js/foundation/foundation.tooltip.js',
      'public/bower_components/foundation/js/foundation/foundation.topbar.js',

      // Custom Scripts
      'public/scripts/custom.js'
    ],
    output: 'public/build/scripts-' + assetsVersion + '.min.js',
    callback: function(err, min) {
      console.log('Javascript minified');
      return done(err);
    }
  });
}

/**
 * Minifies the Images
 * @param  Function done   Async callback
 */
function minifyImages(done) {
  imagemin(['public/images/**/*.{jpg,png,gif}'], 'public/build/images', {
    plugins: [
      imageminMozjpeg({
        quality: 80
      }),
      imageminPngquant({
        quality: '65-80'
      }),
      imageminGifsicle()
    ]
  }).then(function(files) {
    console.log('Images minified');
    return done();
  });
}
