const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    clear = require('gulp-clean');

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('style', function() {
    return gulp.src('src/sass/**/*.+(scss|sass)')
                .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
                .pipe(rename({
                    suffix: '.min'
                }))
                .pipe(autoprefixer({
                    cascade: false
                }))
                .pipe(cleanCSS({compatibility: 'ie8'}))
                .pipe(gulp.dest('src/css'))
                .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.+(scss|sass)', gulp.parallel('style'));
});

gulp.task('clear_docs', function(){
    return gulp.src('docs/*', {read: false})
                .pipe(clear());
});

gulp.task('copy_docs', function(){
    return gulp.src([
        'src/css/*.css', 
        'src/fonts/*', 
        'src/img/*', 
        'src/js/*', 
        'src/*.html'], {base: 'src'})
        .pipe(gulp.dest('docs'));
});

gulp.task('build', gulp.parallel('clear_docs', 'copy_docs'));

gulp.task('default', gulp.parallel('watch', 'server', 'style'));