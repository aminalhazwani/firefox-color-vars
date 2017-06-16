var jsonSass = require('gulp-json-sass'),
    change = require('gulp-change'),
    gulp = require('gulp'),
    yaml = require('gulp-yaml')
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sequence = require('gulp-sequence');

gulp.task('yaml2json', function() {
  return gulp
    .src('firefox-colors.yaml')
    .pipe(yaml({ space: 2 }))
    .pipe(gulp.dest('./'))
});

gulp.task('yaml2sass', function() {
  return gulp
    .src('firefox-colors.yaml')
    .pipe(yaml({ space: 2 }))
    .pipe(jsonSass())
    .pipe(rename('_firefox-colors.scss'))
    .pipe(gulp.dest('./'));
});

gulp.task('yaml2css', function() {
  return gulp
    .src('firefox-colors.yaml')
    .pipe(yaml({ space: 2 }))
    .pipe(jsonSass())
    .pipe(change(cssVars))
    .pipe(rename('firefox-colors.css'))
    .pipe(gulp.dest('./'));
})

function cssVars(content) {
  var transform = content.replace(/\$/g, '  --');
  return ':root {\n' + transform + '\n}';
}

gulp.task('colors', sequence('yaml2json', 'yaml2sass', 'yaml2css'));
