#!/usr/bin/env bash

# Use nodemon to watch and reload our app codebase
./node_modules/.bin/nodemon --ignore src/www src/api/index.js
