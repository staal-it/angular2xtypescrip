var gulp = require('gulp'),
del = require('del'),
ts = require('gulp-typescript'),
typings = require('gulp-typings'),
debug = require('gulp-debug'),
concat = require('gulp-concat'),
series = require('stream-series'),
inject = require('gulp-inject'),
sourcemaps = require('gulp-sourcemaps'),
rename = require('gulp-rename');

var webroot = "webroot";
var tsProject = ts.createProject('tsconfig.json', {typescript: require('typescript')});
var paths = {
    scripts_source: 'Scripts/',
    scripts_dest: webroot + "/js/",
    angular_source: 'app/',
    angular_source_templates: 'app/**/*.html',
    angular_dest: webroot + "/app/",
    angular_typescript_source: ['app/**/*.ts', '!**/*.test.ts'],
    angular_typescript_dest: 'app/',
    nodemodules: "node_modules/",
    lib: webroot + "/lib/"
};

gulp.task('default', ['get:typescript-definitions', 'compile:typescript', 'copy:injected-spa-index-html', 'copy:angular-templates'], function () {
    process.stdout.write('Building debug friendly frontend for environment');
});

gulp.task('compile:typescript', ['clean:compiled-typescript'], function () {
    gulp.src(paths.angular_typescript_source)
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.angular_dest));
});

gulp.task('clean:compiled-typescript', function () {
    return del(paths.angular_source + '**/*.js');
});

gulp.task('copy:lib', function () {
    return getVendorLibraryJsInRightOrder()
    .pipe(debug({ title: 'Concatenating vendor JS libraries:' }))
    .pipe(concat("lib.js"))
    .pipe(gulp.dest(paths.lib + "js"));
});

function getVendorLibraryJsInRightOrder() {
    return gulp.src([
        paths.nodemodules + 'es6-shim/es6-shim.min.js',
        paths.nodemodules + 'systemjs/dist/system-polyfills.js',
        paths.nodemodules + 'angular2/es6/dev/src/testing/shims_for_IE.js',
        paths.nodemodules + 'angular2/bundles/angular2-polyfills.js',
        paths.nodemodules + 'systemjs/dist/system.src.js',
        paths.nodemodules + 'rxjs/bundles/Rx.js',
        paths.nodemodules + 'angular2/bundles/angular2.dev.js',
        paths.nodemodules + 'angular2/bundles/router.js',
        paths.nodemodules + 'angular2/bundles/http.js'
    ]);
}

gulp.task("watcher", function () {
    gulp.watch(paths.angular_source + '**/*.{ts,html,json}', ['compile:typescript', 'copy:angular-templates']);
});


gulp.task('copy:injected-spa-index-html', ['copy:lib'], function () {
    var angularModulesDestination = gulp.src(paths.angular_dest + 'app.js', { read: false });
    var angularLogicDestination = gulp.src([paths.angular_dest + '**/*.js',
                                            '!' + paths.angular_dest + 'app.js',
                                            '!' + paths.angular_dest + 'settings.js'], {
                                                read: false
                                            });

    return gulp.src('app/index-spa.html')
        .pipe(inject(series(angularModulesDestination, angularLogicDestination),
        {
            ignorePath: webroot,
            addRootSlash: false
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(webroot));
});

gulp.task('copy:angular-templates', function () {
    return gulp.src([paths.angular_source_templates, '!' + paths.angular_source + 'index-spa.html'])
        .pipe(gulp.dest(paths.angular_dest));
});

gulp.task('clean:angular', function () {
    return del(paths.angular_dest + '/*');
});

gulp.task('get:typescript-definitions', function () {
    // Don't forget to include new definition files in project
    gulp.src("./typings.json")
        .pipe(typings());
});