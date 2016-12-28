# To Deploy:

npm run build:webpack -> this will build files in dist/ dir.
-> do a git commit / git add to update built files
-> then run:

npm run build:webpack && git subtree push --prefix dist heroku master

link is:

https://belvedere-rasinski.herokuapp.com/
https://github.com/heks/belvedere-trading

Master script to deploy:

rm -r dist/main-* && npm run build:webpack && git commit -a -m "new dist build" && npm run deploy && git push origin master