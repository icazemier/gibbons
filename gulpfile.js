'use strict';
/**
 * Created by ivo.cazemier on 01/11/16.
 */

const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');
const jsdoc = require('gulp-jsdoc3');
const plumber = require('gulp-plumber');

gulp.doneCallback = function (err) {
    process.exit(err ? 1 : 0);
};

gulp.task('default', ['lint', 'test', 'docs']);


gulp.task('pre-test', () => {
    return gulp.src(['lib/**/*.js'])
    // Covering files
        .pipe(istanbul({includeUntested: true}))
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], () => {

    return gulp.src(['test/**/*.test.js', '!test/coverage/*'], {read: false})
        .pipe(plumber())
        .pipe(mocha({
            reporter: 'spec',
            globals: {}
        }))
        // Creating the reports after tests ran
        .pipe(istanbul.writeReports({
            dir: './test/coverage'
        }))
        // Enforce coverage
        .pipe(istanbul.enforceThresholds({
            thresholds: {
                global: 100
            }
        }));
});


gulp.task('lint', () => {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['lib/**/*.js', '!node_modules/**'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('watch-test', () => {
    gulp.watch(['lib/**', 'index.js', 'test/**'], ['test']);
});


gulp.task('docs', (cb) => {
    const config = require('./config/jsdocs');
    gulp.src(['README.md', './index.js', './lib/**/*.js'], {read: false})
        .pipe(plumber())
        .pipe(jsdoc(config, cb));
});
