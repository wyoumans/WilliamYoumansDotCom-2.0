#!/bin/bash

  echo ""
  echo "emptying database"
  mongo williamyoumans --eval "db.dropDatabase()";
  mongo williamyoumans_local --eval "db.dropDatabase()";
  mongo williamyoumans_staging --eval "db.dropDatabase()";
  mongo williamyoumans_production --eval "db.dropDatabase()";
