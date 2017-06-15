var jsonSass = require('gulp-json-sass'),
    change = require('gulp-change'),
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sequence = require('gulp-sequence');
 
gulp.task('sass', function() {
  return gulp
    .src('firefox-colors.json')
    .pipe(jsonSass())
    .pipe(gulp.dest('./'));
});

gulp.task('json2', function() {
  return gulp.src('firefox-colors.scss')
        .pipe(change(performChange))
        .pipe(rename('firefox-colors.json'))
        .pipe(gulp.dest('clr-precompile'))
})

function performChange(content) {
    var transform = 
      content.replace(/\:/g, '", "hex" :')
             .replace(/\#/g, '"')
             .replace(/\$/g, '{ "name" : "')
             .replace(/;/g, '" },');
    return '[\n' + transform + ']';
}


gulp.task('default',['sass']);

gulp.task('precompile', sequence('sass', 'json2'));
