var jsonSass = require('gulp-json-sass'),
    change = require('gulp-change'),
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sequence = require('gulp-sequence');

gulp.task('json2sass', function() {
  return gulp
    .src('firefox-colors.json')
    .pipe(jsonSass())
    .pipe(rename('_firefox-colors.scss'))
    .pipe(gulp.dest('./'));
});

gulp.task('json2css', function() {
  return gulp
    .src('firefox-colors.json')
    .pipe(jsonSass())
    .pipe(change(cssVars))
    .pipe(rename('firefox-colors.css'))
    .pipe(gulp.dest('./'));
})

function cssVars(content) {
  var transform = content.replace(/\$/g, '  --');
  return ':root {\n' + transform + '\n}';
}

gulp.task('colors', sequence('json2sass', 'json2css'));
