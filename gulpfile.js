'use strict';

var gulp = require('gulp'),
  merge = require('merge-stream'),
  $ = require('gulp-load-plugins')(),
  pugPHPFilter = require('pug-php-filter');

// PROCESS CSS
var cssSrc = 'src/sass/**/*.scss',
  cssDest = 'dist/css',
  cssName = 'main';

var supported = [
  'last 2 versions',
  'safari >= 6',
  'ie >= 7',
  'ff >= 3',
  'ios 6',
  'opera 11',
  'android 4'
];

gulp.task('process-css', function () {

  // process sass
  var css = gulp.src([cssSrc])
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .pipe($.autoprefixer({
      browsers: supported,
      cascade: true
    }))
    .pipe($.rename(cssName + '.css'));

  // minify and clean css
  var min = css.pipe($.clone())
    .pipe($.cleanCss({
      compatibility: 'ie9',
      level: {
        1: {
          all: true,
          specialComments: 'none'
        },
        2: {
          all: true,
          restructureRules: false,
          mergeNonAdjacentRules: false
        }
      }
    }))
    .pipe($.rename(cssName + '.min.css'));

  // merge pipes and output separate files with sourcemaps
  return merge(css, min)
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(cssDest));
});

// PROCESS JS
var jsSrc = 'src/js/**/*.js',
  jsDest = 'dist/js',
  jsName = 'main';

gulp.task('process-js', function () {

  // combine all js files in folder, starting alphabetically
  var concat = gulp.src(jsSrc)
    .pipe($.sourcemaps.init())
    .pipe($.concat(jsName + '.js'));

  // minify javascript file
  var ugly = concat.pipe($.clone())
    .pipe($.uglify())
    .pipe($.rename(jsName + '.min.js'))

  // merge pipes and output separate files with sourcemaps.
  return merge(concat, ugly)
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(jsDest));
});

var pugSource = './src/pug/**/*.pug';

// Process Pug
gulp.task('process-pug', function buildHTML() {
  return gulp.src(pugSource)
    .pipe($.pug({
      pretty: false
    }))
    .pipe(gulp.dest('src/html'));
});

//Process Pug PHP
gulp.task('process-pug-php', function () {
  return gulp.src(pugSource)
    .pipe($.pug({
      filters: {
        php: pugPHPFilter
      }
    }))
    .pipe($.rename(function (path) {
      path.extname = ".php"
    }))
    .pipe(gulp.dest('./src/php'));

});

// watch folders and automatically process
gulp.task('watch', function () {
  gulp.watch(cssSrc, ['process-css']);
  gulp.watch(jsSrc, ['process-js']);
  gulp.watch(pugSource, ['process-pug-php']);
});
