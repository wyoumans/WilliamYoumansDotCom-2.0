#!/bin/bash

  echo ""
  echo "emptying database"
  mongo williamyoumans --eval "db.dropDatabase()";
