'use strict';

var gulp = require('gulp');

var bump = require('gulp-bump');
var concat = require('gulp-concat');
var git = require('gulp-git');
var header = require('gulp-header');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglifyjs');

var pkg = require('./package.json');
var banner = '/*! <%= pkg.name %> v<%= pkg.version %> ' +
             '| (c) 2014 Michael Alt ' +
             'http://lean-stack.github.io/license.txt */\n';

gulp.task('js-style', function() {
  return gulp.src(['./gulpfile.js', './src/**/*.js', './test/**/*.js'])
    .pipe(jscs());
});

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

gulp.task('build', ['js-lint', 'js-style']);

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

gulp.task('bump:patch', function() {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump())
    .pipe(gulp.dest('./'));
});

gulp.task('bump:feature', function() {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump({type: 'minor'}))
    .pipe(gulp.dest('./'));
});

gulp.task('release', function() {
  var pkg = require('./package.json');
  var v = 'v' + pkg.version;
  var message = 'Release ' + v;

  return gulp.src('./')
    .pipe(git.commit(message))
    .pipe(git.tag(pkg.version, v))
    .pipe(git.push('origin', 'master', '--tags'))
    .pipe(gulp.dest('./'));
});
