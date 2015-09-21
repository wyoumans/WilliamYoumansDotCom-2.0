#!/bin/bash

# Ensure the latest assets have been compiled
make compass

# Concatenation and minify js
#  public/bower_components/jquery.easing/js/jquery.easing.js,
#  public/bower_components/snabbt.js/snabbt.js,
#  public/scripts/custom.js

# Minify the assets
node ./bin/minify
