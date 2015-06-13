
var gulp = require('gulp');
var sass = require('gulp-sass');
var karma = require('karma').server;

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

gulp.task('karma-tests', function(done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('default', gulp.series('build-css'));
