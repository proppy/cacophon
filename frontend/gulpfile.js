var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var replace = require('gulp-replace');
var clean = require('gulp-clean');

gulp.task('scripts', function() {
  return gulp.src('build/vulcanize/index.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('vulcanize', function() {
  return gulp.src('assets/index.html')
    .pipe(vulcanize({csp: true, dest: 'build/vulcanize'}))
    .pipe(replace('../assets/bower_components/webaudio-controls/img', 'img'))
    .pipe(replace('../assets/images', 'img'))
    .pipe(replace('index.js', 'js/index.js'))
    .pipe(gulp.dest('build/vulcanize'));
});

gulp.task('images', function() {
  return gulp.src(['assets/images/background.jpg',
                   'assets/bower_components/webaudio-controls/img/LittlePhatty.png'])
    .pipe(imagemin({progressive: true}))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('clean', function() {
  return gulp.src(['dist', 'build'], {read: false})
    .pipe(clean());
});

gulp.task('dist', function() {
  return gulp.src(['build/vulcanize/index.html',
                   'assets/favicon.ico',
                   'assets/robots.txt'])
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean', 'vulcanize', 'scripts', 'images', 'dist']);
