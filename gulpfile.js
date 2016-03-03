var jsonSass = require('gulp-json-sass'),
    gulp = require('gulp'),
    sass = require('gulp-sass');
 
gulp.task('sass', function() {
  return gulp
    .src('firefox-color-vars.json')
    .pipe(jsonSass())
    .pipe(gulp.dest('./'));
});

gulp.task('default',['sass']);
