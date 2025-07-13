#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:rasmus322/vue_calendar_app.git main:gh-pages

cd -