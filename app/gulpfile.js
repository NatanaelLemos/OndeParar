"user strict";

var gulp = require('gulp'),
    bower = require('gulp-bower'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    jsMin = require('gulp-jsmin'),
    shell = require('gulp-shell');

gulp.task("bower", function(){
    return bower("./bower_components");
});

gulp.task("copy-styles", ["bower"], function(){
    gulp.src(["bower_components/ionic/css/ionic.min.css"])
        .pipe(gulp.dest("www/css"));
    gulp.src(["bower_components/ionic/fonts/*"])
        .pipe(gulp.dest("www/fonts"));
});

gulp.task("copy-scripts",["bower"], function(){
    gulp.src(["bower_components/ionic/js/ionic.bundle.min.js"])
        .pipe(gulp.dest("www/js"));
});

gulp.task('minify-css', function() {
    gulp.src('www/css/style.css')
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('www/css/'));
});

gulp.task('minify-js', function(){
    gulp.src(['lib/app.js', 'lib/directives.js', 'lib/controllers/app.ctrl.js', 'lib/controllers/map.ctrl.js'])
        .pipe(jsMin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('www/js'));
});

//////////////////////
///////COMPILE////////

gulp.task('compile', shell.task([
    // 'ionic platform add android',
    // 'ionic plugin add cordova-plugin-geolocation',
    // 'ionic build android'
], {
    //Se a plataforma já estiver adicionada, vai dar erro e impedir a compilação
    ignoreErrors: true 
}));

gulp.task("default", ["copy-styles", "copy-scripts", "minify-css", "minify-js", "compile"]);
