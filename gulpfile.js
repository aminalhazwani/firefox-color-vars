var jsonSass = require('gulp-json-sass'),
    change = require('gulp-change'),
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sequence = require('gulp-sequence'),
    exec = require('gulp-exec'),
    del = require('del');

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

gulp.task('json2clr', function(cb) {
  return gulp
    .src('firefox-colors.json')
    .pipe(change(toCapitalize))
    .pipe(rename('firefox-colors-precompile.json'))
    .pipe(gulp.dest('./'))
    .pipe(exec('./json2clr -n "Firefox Colors" -i firefox-colors-precompile.json -o "Firefox Colors.clr"'));;
})

gulp.task('clean', function(cb){
  del(['./firefox-colors-precompile.json'], cb);
});

function toCapitalize(content) {
  let data = JSON.parse(content);
  let output = [];
  for (let color of Object.keys(data)) {
    let colorObject = data[color];
    for (let shade of Object.keys(colorObject)) {
      let colorName = color[0].toUpperCase() + color.slice(1).toLowerCase();
      let colorHex = colorObject[shade].slice(1, 7)
      output.push({name: `${colorName} ${shade}`, hex: `${ colorHex }`});
    }
  }
  return JSON.stringify(output);
}

gulp.task('colors', sequence('json2sass', 'json2css', 'json2clr', 'clean'));
