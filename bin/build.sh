#!/bin/bash

# Ensure the latest assets have been compiled
make compass

# Minify the assets
node ./bin/minify
