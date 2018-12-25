// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync'),
    filter      = require('gulp-filter'),
    cmq = require('gulp-combine-media-queries'),
    plumber = require('gulp-plumber'),
    pxtorem = require('gulp-pxtorem');

/* 
 * Handle error to avoid break or sending a scss file in css folder
 * https://github.com/gulpjs/gulp/issues/259
*/
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}


// Reload
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        },
        open: false
    });
});


// Sass
gulp.task('sass', function() {
    return sass('sass/main.scss', { 
    })
      .on('error', function (err) { console.log(err.message); })
      .pipe(gulp.dest('css'))
});

// Postprocess
gulp.task('postprocess', function() {
  return gulp.src('css/main.css')
    .pipe(pxtorem({
      root_value: 16,
      unit_precision: 5,
      prop_white_list: ['font', 'font-size', 'line-height', 'letter-spacing'],
      replace: false,
      media_query: false
    }))
    .pipe(cmq())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('css'))
    .pipe(minifycss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css'))
    .pipe(filter('**/*.css')) // Filtering stream to only css files
    .pipe(browserSync.reload({stream:true}))
});

// Scripts
gulp.task('scripts', function() {  
    return gulp.src(['js/*.js', '!js/vendor/**', '!js/main.min.js'])
        .pipe(plumber({
            errorHandler: handleError
          }))
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(plumber.stop())  
        .pipe(gulp.dest('js/'))
        .pipe(browserSync.reload({stream:true}))
});

// Minify scripts before production: todo

// Images
gulp.task('images', function() {
  return gulp.src(['img/original/*.png', 'img/original/*.jpg'])
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('img/'))
});




  // Default task
gulp.task('default', ['sass', 'postprocess', 'scripts', 'images', 'browser-sync'], function() {

    // Watch .scss files
    gulp.watch('sass/*.scss', ['sass']);

    // Watch main.css files
    gulp.watch('css/main.css', ['postprocess']);

    // Watch .js files
    gulp.watch('js/*.js', ['scripts']);

    // Watch image files
    gulp.watch('img/original/*', ['images']);
});
