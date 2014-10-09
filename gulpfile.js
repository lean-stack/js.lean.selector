'use strict';

var gulp = require('gulp');

var concat = require('gulp-concat');
var header = require('gulp-header');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglifyjs');

var pkg = require('./package.json');
var banner = '/*! <%= pkg.name %> v<%= pkg.version %> ' +
             '| (c) 2014 Michael Alt ' +
             'http://lean-stack.github.io/license.txt */\n';

gulp.task('js-lint', function() {
  return gulp.src(['./gulpfile.js', './src/**/*.js', './test/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('compress', function() {
  return gulp.src('./src/**/*.js')
    .pipe(uglify(pkg.name + '.min.js', {
      outSourceMap: true,
      basePath: ''
    }))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['js-lint']);

gulp.task('dist', ['compress'], function() {
  return gulp.src('./src/**/*.js')
    .pipe(concat(pkg.name + '.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('test', function(done) {
  var karma = require('karma').server;
  karma.start({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true
  }, done);
});
