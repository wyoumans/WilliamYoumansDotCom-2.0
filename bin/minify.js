'use strict';

var compressor = require('node-minify'),
    async = require('async');

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
 * Minifies the Javascript
 * @param  Function done   Async callback
 */
function minifyJS(done) {
    return done();
    /*
    new compressor.minify({
        type: 'gcc',
        fileIn: 'scripts/index-compiled.js',
        fileOut: 'scripts/index.min.js',
        callback: function(err) {
            console.log('Scripts minified');
            return done(err);
        }
    });
    */
}

/**
 * Minifies the CSS
 * @param  Function done   Async callback
 */
function minifyCSS(done) {
    new compressor.minify({
        type: 'yui-css',
        fileIn: 'styles/styles.css',
        fileOut: 'styles/styles.min.css',
        callback: function(err) {
            console.log('Screen styles minified');
            return done(err);
        }
    });
}
