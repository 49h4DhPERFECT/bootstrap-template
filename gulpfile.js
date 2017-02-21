var gulp = require('gulp');
var del = require('del');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
// Images
var image = require('gulp-image');
// SASS - CSS
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uncss = require('gulp-uncss');
// JS
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

// Variables
var browsers = [
    "Android 2.3",
    "Android >= 4",
    "Chrome >= 20",
    "Firefox >= 24",
    "Explorer >= 9",
    "iOS >= 6",
    "Opera >= 12",
    "Safari >= 6"
];
var includePaths = [
    'node_modules/bootstrap-sass/assets/stylesheets'
    // 'node_modules/motion-ui/src'
];
var jsConcat = [
    // 'jquery/dist/jquery.min.js',
    // 'node_modules/foundation-sites/js/foundation.core.js',
    // 'node_modules/foundation-sites/js/foundation.util.mediaQuery.js',
    // 'node_modules/foundation-sites/js/foundation.util.timerAndImageLoader.js',
    // 'node_modules/foundation-sites/js/foundation.equalizer.js',
    'assets/js/project.js'
];

// Tasks
gulp.task('scss', function () {
    return gulp.src('assets/scss/*.scss')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({includePaths: includePaths, outputStyle: 'expanded'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css'))
        .pipe(plumber.stop())
        .pipe(browserSync.stream())
});

gulp.task('scss_build', function () {
    return gulp.src('assets/scss/*.scss')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error);
                this.emit('end');
            }
        }))
        .pipe(sass({includePaths: includePaths, outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: browsers
        }))
        // Disabled cause destroy animations and so on.
        // .pipe(uncss({
        //     html: ['assets/html/**/*.html'],
        //     ignore: [
        //         new RegExp('^\.is-.*')
        //     ]
        // }))
        .pipe(cleanCSS({compatibility: '*'}))
        .pipe(gulp.dest('public/css'))
        .pipe(plumber.stop());
});

gulp.task('html',function () {
    return gulp.src('assets/*.html')
        .pipe(gulp.dest('public'))
        .pipe(browserSync.stream())
});

gulp.task('fonts', function () {
    gulp.src('assets/fonts/**')
        .pipe(gulp.dest('public/fonts'))
        .pipe(browserSync.stream())
});

gulp.task('js', function () {
    return gulp.src(jsConcat)
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/js/'))
        .pipe(plumber.stop())
        .pipe(browserSync.stream())
});

gulp.task('js_build', function () {
    return gulp.src(jsConcat)
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error);
                this.emit('end');
            }
        }))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js/'))
        .pipe(plumber.stop())
});

gulp.task('images', function () {
    gulp.src('assets/images/*')
        .pipe(gulp.dest('public/images/'))
        .pipe(browserSync.stream())
});

gulp.task('images_build', function () {
    gulp.src('assets/images/*')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error);
                this.emit('end');
            }
        }))
        .pipe(image({
            pngquant: true,
            optipng: true,
            zopflipng: false,
            jpegRecompress: false,
            jpegoptim: true,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10
        }))
        .pipe(gulp.dest('public/images/'))
        .pipe(plumber.stop())
});

//Clean
gulp.task('clean', function () {
    del.sync(['public/**', '!public']);
});

//browser-sync
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "public/"
        },
        notify: true // Change to "false" if message is annoying
    });
    gulp.watch('assets/scss/**/*.scss', ['scss']);
    gulp.watch('assets/*.html', ['html']);
    gulp.watch('assets/js/*.js', ['js']);
    gulp.watch('assets/images/*', ['images']);
    gulp.watch('assets/fonts/*', ['fonts']);
});

//Compile
gulp.task('compile', ['clean', 'html', 'fonts', 'images', 'scss', 'js']);

//Build
gulp.task('build', ['clean', 'html', 'fonts', 'images_build', 'scss_build', 'js_build']);

//Default
gulp.task('default', ['compile', 'browser-sync']);
