var gulp =          require('gulp'),
    plugins =       require('gulp-load-plugins')(),
    browserSync =   require('browser-sync'),
    less =          require('gulp-less'),
    jade =          require('gulp-jade'),
    imagemin =      require('gulp-imagemin'),
    uglify =        require('gulp-uglify'),
    chalk =         require('chalk'),
    sourcemaps =    require('gulp-sourcemaps'),
    source =        require('vinyl-source-stream'),
    buffer =        require('vinyl-buffer'),
    DIST =          './',
    ASSETS =        DIST + '/assets'
    ;

gulp.task('clean', function (cb) {
    del([
        ASSETS + '/**'
    ], cb);
});

/*
 * Browser-sync task (static server)
 */
gulp.task('browser-sync', function() {
    browserSync.init([ASSETS + '/css/style.css', DIST + '/*.html'], {
        server: {
            baseDir: DIST
        }
    });
});

gulp.task('styles', function() {
    gulp.src('less/style.less')
    .pipe(less({compress: true}))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest(ASSETS + '/css'))
    .pipe(plugins.size({
        title: 'css'
    }));
});

gulp.task('templates', function() {
    var texts = {
        'lang': "fr",
        'domain': "web-app.io", //'localhost:3000',
        'baseline' : "Apps iOS / Android / Sites Web - Freelance",
        'city': "Nantes",
        'country': "France"
    };

    gulp.src('jades/*.jade')
    .pipe(jade({data: texts}))
    .pipe(gulp.dest(DIST));
});

gulp.task('vendors', function() {
    gulp.src('vendors/**/*.*')
    .pipe(gulp.dest(ASSETS + '/vendors'));
});

gulp.task('fonts', function() {
    gulp.src('fonts/**/*.*')
    .pipe(gulp.dest(ASSETS + '/fonts'));
});

gulp.task('scripts', function() {
    gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(ASSETS + '/js'));

    gulp.src('*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(require('jshint-stylish')));
});

gulp.task('imagemin', function() {
    gulp.src(['img/*.png', 'img/*.jpeg', 'img/*.jpg', 'img/*.gif'])
    .pipe(imagemin())
    .pipe(gulp.dest(ASSETS + '/images'));
});

gulp.task('watch', function() {
    gulp.watch('less/**/*.less', ['styles']);
    gulp.watch('jades/**/*.jade', ['templates']);
    gulp.watch('img/**/*.*', ['imagemin']);
    gulp.watch('vendors/**/*.*', ['vendors']);
    gulp.watch('js/**/*.*', ['scripts']);
    gulp.watch('fonts/**/*.*', ['fonts']);
    console.log(chalk.green('Build.complete!'));
});

gulp.task('default', [
    'fonts',
    'vendors',
    'imagemin',
    //'styles',
    'scripts',
    'templates',
    'browser-sync',
    'watch'
], function(){
    console.log(chalk.green('Build.complete!'));
});

gulp.task('build', [
    'fonts',
    'vendors',
    'imagemin',
    //'styles',
    'scripts',
    'templates',
], function(){
    console.log(chalk.green('Build complete!'));
});