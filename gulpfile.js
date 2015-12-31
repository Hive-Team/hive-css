var gulp = require('gulp');
var uglifyjs = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var less = require('gulp-less');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var minifycss = require('gulp-minify-css');
var webserver = require("gulp-webserver");
var concat = require('gulp-concat');
var del = require('del');


/* 合并压缩LESS */
gulp.task('minifyless', function () {
    gulp.src('./app/assets/less/app.less')
        .pipe(less())
        //.pipe(minifycss())
        .pipe(gulp.dest('./app/assets/minicss'));
});

///* 合并js依赖 */
//gulp.task('browserify', function() {
//    browserify('./app/index/src/app.js')
//        .transform(babelify)
//        .bundle()
//        .on('error',function(err){console.log(err.message)})
//        .pipe(source('bundle.js'))
//        //.pipe(buffer())
//        //.pipe(uglifyjs())
//        .pipe(gulp.dest('./app/index/build'));
//});

gulp.task('webserver', function() {
    gulp.src('./app')
        .pipe(webserver({
            host: 'localhost',
            port:8000,
            livereload: false
        })
    );
});

gulp.task("cleancss",function(cb){
    del(['./app/assets/minicss/*.css'], cb);
});

gulp.task("watcherless",function(){
    gulp.watch(['./app/assets/less/**/*.less'],['cleancss','minifyless']);
});

//gulp.task("watcherjs",function(){
//    gulp.watch('./app/index/src/**/*.js',['cleanjs','browserify']);
//});

gulp.task('default',['minifyless','watcherless','webserver']);
