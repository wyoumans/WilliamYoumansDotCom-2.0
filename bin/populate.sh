#!/bin/bash

echo ""
echo "beginning database population"
echo ""

echo "seeding redirects..."
node scripts/seed-redirects.js
echo ""
echo "fetching images from instagram..."
node scripts/fetch-images.js
echo ""
echo "fetching tracks from last.fm..."
node scripts/fetch-tracks.js
echo ""
echo "fetching tweets from twitter..."
node scripts/fetch-tweets.js

echo ""
echo "finishing database population"
echo ""
