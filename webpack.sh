#!/bin/sh
set -e

PATH=$(npm bin):$PATH

echo "nodejs $(node --version)"
npm install
npm run watch
