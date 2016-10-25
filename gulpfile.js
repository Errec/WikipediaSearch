var gulp         = require('gulp'),
    uglify       = require('gulp-uglify'),
    browserSync  = require('browser-sync'),
    plumber      = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    changed      = require('gulp-changed'),
    sass         = require('gulp-sass'),
    jade         = require('gulp-jade'),
    imagemin     = require('gulp-imagemin');

//  Scritp tasks
//   Uglifies
gulp.task('scripts', function(){

  gulp.src('_sass/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('develpment/css/'));

  gulp.src('_jade/**/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('develpment/'));

  gulp.src('develpment/img/**/*')
    .pipe(changed('_img'))
    .pipe(imagemin())
    .pipe(gulp.dest('_img'));

  gulp.src('js/*.js')
      .pipe(plumber())
      .pipe(uglify())
      .pipe(gulp.dest('build/js'));

  gulp.src('develpment/css/main.css')
    .pipe(autoprefixer({
        browsers: ['last 3 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('develpment/css'))
});

//  Watch tasks
//   Uglifies
gulp.task('watch', ['browserSync'], function(){
  gulp.watch('develpment/js/*.js', browserSync.reload);
  gulp.watch('_jade/**/*.jade', browserSync.reload);
  gulp.watch('_sass/**/*.scss', browserSync.reload);
});

//  Auto load browser
//   BrowserSync
gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      proxy: "local.dev"
    }
  });
});

gulp.task('default', ['scripts', 'watch']);
