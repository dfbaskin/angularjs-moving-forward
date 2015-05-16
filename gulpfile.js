
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('build-css', function() {
    return gulp
        .src('scss/presentation.scss')
        .pipe(sass({
            includePaths: ['scss', 'src/jspm_packages/github/zurb/bower-foundation@5.5.2/scss'],
            outputStyle: 'nested',
            errLogToConsole: true
        }))
        .pipe(gulp.dest("src/css"));
});

gulp.task('watch-css', function() {
    gulp.watch('scss/**/*.scss', gulp.series('build-css'));
});

gulp.task('default', gulp.series('build-css'));
