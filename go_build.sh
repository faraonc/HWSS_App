#!/usr/bin/env bash
browserify -t vueify -e public/app.js -o build/app.js