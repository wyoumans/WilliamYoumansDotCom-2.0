'use strict';

var compressor = require('node-minify')
  , async = require('async');

console.log();
console.log('Beginning minification');

async.parallel([minifyJS, minifyCSS], function(err, results) {
  if (err) {
    console.log(err);
  }
  console.log();
  console.log('Minification complete! Deploy at will.');
});

/**
 * Minifies the CSS
 * @param  Function done   Async callback
 */
function minifyCSS(done) {
  new compressor.minify({
    type: 'yui-css',
    fileIn: 'public/styles/styles.css',
    fileOut: 'public/styles/styles.min.css',
    callback: function(err) {
      console.log('Screen styles minified');
      return done(err);
    }
  });
}
