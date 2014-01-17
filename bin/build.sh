#!/bin/bash

# Ensure the latest assets have been compiled
make compass

# minify the assets
node ./bin/minify
