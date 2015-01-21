var gulp =          require('gulp'),
    browserSync =   require('browser-sync'),
    less =          require('gulp-less'),
    jade =          require('gulp-jade'),
    imagemin =      require('gulp-imagemin'),
    uglify =        require('gulp-uglify'),
    DIST =          './'
    ;

/*
 * Browser-sync task (static server)
 */
gulp.task('browser-sync', function() {
    browserSync.init([DIST + '/assets/css/style.css', DIST + '/*.html'], {
        server: {
            baseDir: DIST
        }
    });
});

/*
 * Less task
 */
gulp.task('less', function() {
    gulp.src('less/style.less')
        .pipe(less())
        .pipe(gulp.dest(DIST + '/assets/css'));
});

/*
 * Jade task
 */
gulp.task('templates', function() {
    var texts = {
        'lang': "fr",
        'domain': "web-app.io", //'localhost:3000',
        'baseline' : "Apps iOS / Android - Sites webs - Freelance",
        'city': "Nantes",
        'country': "France"
    };

    gulp.src('jades/*.jade')
    .pipe(jade({data: texts}))
    .pipe(gulp.dest(DIST))
});

/*
 * Copy vendors task
 */
gulp.task('vendors', function() {
    gulp.src('vendors/**/*.*')
    .pipe(gulp.dest(DIST + '/assets/vendors'));
});

/*
 * Copy fonts task
 */
gulp.task('fonts', function() {
    gulp.src('fonts/**/*.*')
    .pipe(gulp.dest(DIST + '/assets/fonts'));
});

/*
 * Uglify JS
 */
gulp.task('compress', function() {
    gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(DIST + '/assets/js'));
});

/*
 * Minify images
 */
gulp.task('imagemin', function() {
    gulp.src(['img/*.png', 'img/*.jpeg', 'img/*.jpg', 'img/*.gif'])
    .pipe(imagemin())
    .pipe(gulp.dest(DIST + '/assets/images'));
});

/*
 * Watch tasks
 */
gulp.task('watch', function() {
    gulp.watch('less/**/*.less', ['less']);
    gulp.watch('jades/**/*.jade', ['templates']);
    gulp.watch('img/**/*.*', ['imagemin']);
    gulp.watch('vendors/**/*.*', ['vendors']);
    gulp.watch('js/**/*.*', ['compress']);
    gulp.watch('fonts/**/*.*', ['fonts']);
});

/*
 * Default task to be run with `gulp`
 */
gulp.task('default', [
    'fonts',
    'vendors',
    'imagemin',
    'less',
    'compress',
    'templates',
    'browser-sync',
    'watch'
]);

gulp.task('build', [
    'fonts',
    'vendors',
    'imagemin',
    'less',
    'compress',
    'templates',
]);