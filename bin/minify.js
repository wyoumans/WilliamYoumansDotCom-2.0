'use strict';

var compressor = require('node-minify')
  , fs = require('fs')
  , async = require('async')
  , walk = require('fs-walk')
  , path = require('path')
  , assetsVersion = require('../lib').assetsVersion;

var imagemin = require('imagemin')
  , imageminMozjpeg = require('imagemin-mozjpeg')
  , imageminPngquant = require('imagemin-pngquant')
  , imageminGifsicle = require('imagemin-gifsicle');

console.log();
console.log('Beginning minification');

async.series([
  deleteOldAssets,
  // minifyCSS,
  // minifyJS,
  minifyImages
], function(err, results) {
  if (err) {
    console.log(err);
  }
  console.log();
  console.log('Assets Version:', assetsVersion);
  console.log('Minification complete! Deploy at will.');
});

/**
 * Recursivly removes files and folders
 */
function removeFolder(location, next) {
  fs.readdir(location, function(err, files) {
    async.each(files, function(file, cb) {
      file = location + '/' + file
      fs.stat(file, function(err, stat) {
        if (err) {
          return cb(err);
        }
        if (stat.isDirectory()) {
          removeFolder(file, cb);
        } else {
          fs.unlink(file, function(err) {
            if (err) {
              return cb(err);
            }
            return cb();
          });
        }
      });
    }, function(err) {
      if (err) return next(err)
      fs.rmdir(location, function(err) {
        return next(err)
      });
    });
  });
}

function mkDirSyncIfNotExists(location) {

  try {
    fs.accessSync(location, fs.constants.R_OK | fs.constants.W_OK);
  } catch (e) {
    fs.mkdirSync(location);
  }

  return true;
}

function deleteOldAssets(done) {
  var buildPath = path.resolve(__dirname + '/../public/build');

  removeFolder(buildPath, function(err) {
    if(err) {
      console.log(err);
    }

    fs.mkdir(buildPath, done);
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

  var inDir = __dirname + '/../public/images';
  var outDir = __dirname + '/../public/build/images';
  var projectBase = __dirname.split(path.sep).slice(0, -1).join(path.sep);

  // walking to maintain the directory structure
  // fs.walk(inDir).on('data', function(item) {
  //   if (isImage(item.path)) {
  //     var inPath = path.resolve(item.path);
  //     var outPath = path.resolve(item.path.replace(n, o));

  //     console.log(inPath, outPath);

  //     // shelljs.echo(`${chalk.green('Minifying')}\n${inPath} to...\n${outPath}\n`)
  //     // shelljs.exec(`mkdir -p ${path.dirname(outPath)}`)
  //     // shelljs.exec(`node_modules/.bin/imagemin ${inPath} > ${outPath}`)
  //   }
  // });

  mkDirSyncIfNotExists(outDir);

  walk.walk(inDir, function(basedir, filename, stat, next) {
    if (stat.isDirectory()) {
      var fullPath = path.resolve(basedir + '/' + filename);
      var newFullPath = fullPath.replace('images', 'build/images');
      var relativePath = fullPath.replace(projectBase, '');
      var newRelativePath = relativePath.replace('images', 'build/images');

      // insure the images dir exists
      mkDirSyncIfNotExists(newFullPath);

      // console.log('projectBase:', projectBase);
      // console.log('basedir:', basedir);
      // console.log('filename:', filename);
      // console.log('fullPath:', fullPath);
      console.log('relativePath:', relativePath);
      // console.log('');

      // imagemin([relativePath + '/*.{jpg,png,gif}'], newRelativePath, {
      //   plugins: [
      //     imageminMozjpeg({
      //       quality: 80
      //     }),
      //     imageminPngquant({
      //       quality: '65-80'
      //     }),
      //     imageminGifsicle()
      //   ]
      // }).then(function(files) {

      //   return next();
      // });

      return next();
    }
  }, function(err) {
    if (err) {
      console.log(err)
    }

    console.log('Images minified');
    return done();
  });
}
