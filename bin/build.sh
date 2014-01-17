#!/bin/bash

# Ensure the latest assets have been compiled
make compass

# Concatenation and minify js
claymate build \
  --addons public/bower_components/gumby-parallax/gumby.parallax.js \
  --modules retina,fixed,navbar,validation \
  --files public/scripts/custom.js

# Minify the assets
node ./bin/minify
