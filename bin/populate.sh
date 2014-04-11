#!/bin/bash

echo ""
echo "beginning database population"
echo ""

node scripts/seed-tools.js
echo ""
node scripts/seed-redirects.js
echo ""
node scripts/fetch-images.js
echo ""
node scripts/fetch-tracks.js

echo ""
echo "finishing database population"
echo ""
