#!/bin/bash
on_die() {
  echo
  echo shutting down
  kill $ID1 $ID2
  exit
}

SUPERVISOR=./node_modules/.bin/supervisor

JS=`find scripts -type f| egrep -v "\/vendor|index-compiled.js" | tr '\n' ',' | sed 's/,$//'`
SASS=`find sass -type f| tr '\n' ',' | sed 's/,$//'`

$SUPERVISOR --quiet -e "js" -n exit -w $JS -x make browserify &
ID1=$!

$SUPERVISOR --quiet -e "scss" -n exit -w $SASS -x make compass &
ID2=$!

trap 'on_die' SIGINT
trap 'on_die' SIGTERM
