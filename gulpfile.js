
//======================================================
// OVERVIEW
//======================================================

// gulp compiles sass and jade, watches for changes
// and serves with livereload... simple

//======================================================
// SETUP
//======================================================

// gulp
var gulp = require('gulp');

// plugins
var jade = require('gulp-jade'),
    stylus = require('gulp-stylus'),
    connect = require('gulp-connect'),
    autoprefixer = require('gulp-autoprefixer');

// paths
var app = './app',
    dist = './dist',
    css = '/css';

//======================================================
// PROCESS
//======================================================

// compile stylus
gulp.task('stylus', function() {
    gulp.src(app + '/*.styl')
        .pipe(stylus())
        .pipe(autoprefixer())
        .pipe(gulp.dest(dist + css))
        .pipe(connect.reload());
});

// compile jade
gulp.task('jade', function() {
    gulp.src(app + '/*.jade')
        .pipe(jade())
        .pipe(gulp.dest(dist))
        .pipe(connect.reload());
});

// move fonts
gulp.task('fonts', function () {
    gulp.src(app + css + '/fonts/*')
        .pipe(gulp.dest(dist + css))
        .pipe(connect.reload());
});

// move others
gulp.task('others', function () {
    gulp.src(app + '/*.ico')
        .pipe(gulp.dest(dist))
        .pipe(connect.reload());
});

//======================================================
// SERVE
//======================================================

// watch
gulp.task('watch', function() {
    gulp.watch(app + '/*.jade', ['jade']);
    gulp.watch(app + css + '/*.styl', ['stylus']);
    gulp.watch(app + css + '/fonts/*', ['fonts']);
    gulp.watch(app + '/*.ico', ['otehrs']);
});

// serve
gulp.task('connect', function() {
  connect.server({
    root: dist,
    port: 9000,
    livereload: true
  });
});

// default
gulp.task('build', [ 'jade', 'stylus', 'fonts', 'others' ]);
gulp.task('default', [ 'build', 'watch', 'connect' ]);
