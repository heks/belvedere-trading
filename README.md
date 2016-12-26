# To Deploy:

npm run build:webpack -> this will build files in dist/ dir.
-> do a git commit to update built files
-> then run:

npm run build:webpack && git subtree push --prefix dist heroku master

link is:

https://belvedere-rasinski.herokuapp.com/