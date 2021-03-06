# [Web-App.io](http://web-app.io)

## SDK: [Glup + Browserify](http://www.browsersync.io/docs/gulp/)

### Install:

```bash
npm install browser-sync gulp gulp-less gulp-jade gulp-imagemin gulp-uglify --save-dev
```

### Build:

```bash
gulp build
```

## Github-Pages auto-publication based on `master` commits

[Create Github Page branch manually](https://help.github.com/articles/creating-project-pages-manually/),
then set up your `.git/config` file this way:

```
[remote "origin"]
    url = git@github.com:WebDashAppDotIo/Ionic-Showcase.git
    fetch = +refs/heads/*:refs/remotes/origin/*
    push = +refs/heads/master:refs/heads/gh-pages
    push = +refs/heads/master:refs/heads/master
```

Then `git push` will keep `gh-pages` branch mirrored on `master`.

## Github Pages hosted apex domain

- [Configuring an A record with your DNS provider](https://help.github.com/articles/tips-for-configuring-an-a-record-with-your-dns-provider)

## Theme

[Landing Page](http://startbootstrap.com/template-overviews/landing-page/), Copyright 2014 Iron Summit Media Strategies, LLC. Code released under the [Apache 2.0](https://github.com/IronSummitMedia/startbootstrap-landing-page/blob/gh-pages/LICENSE) license.
