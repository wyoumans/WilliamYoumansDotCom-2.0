#!/bin/bash

# Ensure the latest assets have been compiled
make compass

# Concatenation and minify js
claymate build \
  --addons public/bower_components/gumby-parallax/gumby.parallax.js \
  --modules retina,fixed,navbar,validation,toggleswitch \
  --files public/bower_components/gumby/js/plugins.js,public/bower_components/gumby/js/main.js,public/bower_components/jquery.easing/js/jquery.easing.js,public/bower_components/snabbt.js/snabbt.js,public/scripts/custom.js

# Minify the assets
node ./bin/minify
