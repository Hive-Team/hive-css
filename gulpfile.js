var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var webserver = require('gulp-webserver');
var less = require('gulp-less');
var del = require('del');


/* 合并压缩LESS */
gulp.task('minifyless', function () {
    gulp.src('./app/assets/less/app.less')
        .pipe(less())
        .pipe(gulp.dest('./app/assets/minicss'));
});

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

gulp.task('default',['minifyless','watcherless','webserver']);
