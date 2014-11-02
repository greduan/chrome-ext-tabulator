var gulp = require('gulp');
var jslint = require('gulp-jslint');

gulp.task('jslint', function () {
    gulp.src(['js/popup.js', 'js/tabsshouldrest.js', 'js/ui.js'])
        .pipe(jslint({
            browser: true,
            todo: true,
            devel: true,
            unparam: true,

            errorsOnly: true
        }))
        .on('error', function (err) {
            console.error(String(err));
        })
});

gulp.task('default', ['jslint']);
