var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    path = require('path'),
    jspm = require('jspm'),
    runSequence = require('run-sequence'),
    vinylPaths = require('vinyl-paths'),
    del = require('del'),
    stylish = require('jshint-stylish'),
    assign = Object.assign || require('object.assign'),

    RSVP = require('rsvp'),
    karma = require('karma').server,
    fs = require('fs'),
    yargs = require('yargs').argv,
    $ = require('gulp-load-plugins')({lazy: true}),

    root = 'src/client',

    compilerOptions = {
        modules: 'system',
        moduleIds: false,
        externalHelpers: true,
        comments: true,
        compact: false
    },

    sassOptions = {
        style: 'expanded'
    },

    minifyCSSOpts = {
        compatibility: 'ie8'
    },


    /**
     * helper method to generate resolveTo`X` paths, rooted at the app root
     */
    resolveTo = function resolveTo(resolvePath) {
        return function (glob) {
            glob = glob || '';
            return path.join(root, resolvePath, glob);
        };
    },

    resolveToApp = resolveTo('app'),  // app/{glob}
    resolveToComponents = resolveTo('app/components'),


// map all of our paths
    paths = {
        srcScripts: resolveToApp('**/*.js'),
        srcHTML: [
            resolveToApp('**/*.html'),
            path.join(root, 'index.html')
        ],
        srcSCSS: resolveToApp('**/*.scss'),
        blankTemplates: path.join(__dirname, 'generator', 'component/**/*.**'),
        karmaConfig: __dirname + 'karma.conf.js',
        dist: path.join(__dirname, 'dist/'),
        unprocessedFiles: resolveToApp('**/*.{json,svg,woff,ttf,png,gif,ico,jpg,eot}')   // stuff that we just want to move around without touching
    };

gulp.task('test', ['compile'], function (done) {
    karma.start({
        configFile: paths.karmaConfig,
        singleRun: true
    }, function () {
        done();
    });
});

gulp.task('clean', function () {
    return gulp.src([paths.dist])
        .pipe(vinylPaths(del));
});

gulp.task('html', function () {
    return gulp.src(paths.srcHTML)
        .pipe($.cached('html'))
        .pipe($.plumber())
        .pipe($.changed(paths.dist, {extension: '.html'}))
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe($.ngHtml2js({
            template: "import angular from 'angular';\n" +
            "export default angular.module('<%= moduleName %>', []).run(['$templateCache', function($templateCache) {\n" +
            "   $templateCache.put('<%= template.url %>',\n    '<%= template.prettyEscapedContent %>');\n" +
            "}]);\n"
        }))
        .pipe($.babel(compilerOptions))
        .pipe(gulp.dest(paths.dist))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scss', function () {
    return gulp.src(paths.srcSCSS)
        .pipe($.cached('scss'))
        .pipe($.plumber())
        .pipe($.changed(paths.dist, {extension: '.css'}))
        .pipe($.sourcemaps.init())
        .pipe($.postcss([
            require('autoprefixer-core')({browsers: ['last 1 version']})
        ]))
        .pipe($.minifyCss(minifyCSSOpts))
        .pipe($.sourcemaps.write("."))
        .pipe(gulp.dest(paths.dist))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('move', function () {
    return gulp.src(paths.unprocessedFiles)
        .pipe($.cached('move'))
        //.pipe(changed(path.output, { extension: '.json' }))
        .pipe(gulp.dest(paths.dist))
        .pipe(browserSync.reload({stream: true}));
});

//gulp.task('json', function () {
//    return gulp.src('./src/**/*.json')
//        .pipe(changed(path.output, {extension: '.json'}))
//        .pipe(gulp.dest(path.output))
//        .pipe(browserSync.reload({stream: true}));
//});

//gulp.task('cache-bust', function () {
//    var cacheBust = "systemLocate = System.locate; System.locate = function(load) { System = this; return Promise.resolve(systemLocate.call(this, load)).then(function(address) { if(address.indexOf('bust') > -1 || address.indexOf('css') > -1 || address.indexOf('json') > -1) return address; return address + System.cacheBust; }); } System.cacheBust = '?bust=' + " + Math.round(new Date() / 1000) + ";";
//    return gulp.src(resolveToApp('app.js'))
//        .pipe(insert.prepend(cacheBust))
//        .pipe(gulp.dest(paths.dist));
//});

//gulp.task('scss-themes', function () {
//    return gulp.src(path.themes)
//        .pipe(cache('scss-themes'))
//        .pipe(plumber())
//        .pipe(changed(path.output, {extension: '.css'}))
//        .pipe(sourcemaps.init())
//        .pipe(sass(sassOptions)).on('error', errorHandler('SCSS Themes'))
//        .pipe(minifyCSS(minifyCSSOpts))
//        .pipe(sourcemaps.write("."))
//        .pipe(gulp.dest(path.themesOutput))
//        .pipe(browserSync.reload({stream: true}));
//});

//gulp.task('es6', function () {
//    return gulp.src(paths.srcScripts)
//        .pipe(cache('es6'))
//        .pipe(plumber())
//        .pipe(changed(path.output, {extension: '.js'}))
//        .pipe(sourcemaps.init())
//        .pipe(babel(compilerOptions))
//        .pipe(ngAnnotate({
//            sourceMap: true,
//            gulpWarnings: false
//        }))
//        .pipe(sourcemaps.write("."))
//        .pipe(gulp.dest(path.output))
//        .pipe(browserSync.reload({stream: true}));
//});

//gulp.task('inline-systemjs', function () {
//    return gulp.src([
//        './jspm_packages/es6-module-loader.js',
//        './jspm_packages/system.js',
//        './system.config.js',
//        'dist/app/app.js'
//    ])
//        //.pipe(uglify())
//        .pipe(concatFile('app/app.js'))
//        .pipe(gulp.dest(path.output))
//});

gulp.task('compile', function (callback) {
    return runSequence(
        //['scss', 'html', 'es6', 'move'],
        ['scss', 'html', 'move'],
        callback
    );
});

gulp.task('recompile', function (callback) {
    return runSequence(
        'clean',
        ['compile'],
        callback
    );
});

gulp.task('compile-production', function (callback) {
    return runSequence(
        'recompile',
        callback
    )
});

//gulp.task('release', function (callback) {
//    return runSequence(
//        'build',
//        'cache-bust',
//        'inline-systemjs',
//        callback
//    );
//});

gulp.task('lint', function () {
    return gulp.src(paths.srcScripts)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('serve', ['recompile', 'watch'], function (done) {
    browserSync({
        open: false,
        port: 9000,
        server: {
            baseDir: ['.'],
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST', 'OPTIONS');
                next();
            }
        },
    }, done);
});

gulp.task('watch', function () {
    var watcher = gulp.watch([paths.srcScripts, paths.srcHTML, paths.srcSCSS], ['compile']);
    watcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('build', ['compile-production'], function () {

    var destFile = path.join(paths.dist + 'client/app.js');
    console.log(destFile);
    console.log(resolveToApp('app'));

    //jspm.setPackagePath('.');
    return jspm.bundleSFX(resolveToApp('app'), destFile, {})
        // Use JSPM to bundle our app
        .then(function () {
            // Also create a fully annotated minified copy
            console.log('Return from initial bundle');
            return gulp.src(destFile)
                .pipe($.ngAnnotate())
                .pipe($.uglify())
                .pipe($.rename({
                    dirname: '',
                    basename: 'app.min',
                    extname: '.js'
                }))
                .pipe(gulp.dest(paths.dist));
        })
        .then(function () {
            // Inject the minified script into the index.html
            return gulp.src(path.join(root, 'index.html'))
                .pipe($.htmlReplace({
                    'js': 'app.min.js'
                }))
                .pipe($.rename({dirname: ''}))
                .pipe(gulp.dest(paths.dist));
        });
});

gulp.task('component', function () {

    var cap = function cap(val) {
        return val.charAt(0).toUpperCase() + val.slice(1);
    };

    var name = yargs.name,
        parentPath = yargs.parent || '',
        destPath = path.join(resolveToComponents(), parentPath, name);

    return gulp.src(paths.blankTemplates)
        .pipe(template({
            name: name,
            upCaseName: cap(name)
        }))
        .pipe(rename(function (path) {
            path.baseName = path.baseName.replace('temp', name);
        }))
        .pipe(gulp.dest(destPath));

});


//gulp.task('build', ['compile-production'], function () {
//    var routes = require('./src/app/routes.json');
//    // get the source paths of our routes
//    routes = routes.map(function (r) {
//        return r.src;
//    });
//
//    var config = {
//        main: 'app/app',
//        routes: routes,
//        bundleThreshold: 0.6,
//        config: './system.config.js',
//        sourceMaps: true,
//        minify: true,
//        mangle: true,
//        dest: 'dist/app',
//        destJs: 'dist/app/app.js'
//    };
//
//    return routeBundler.build(config);
//});


gulp.task('default', function () {
    gulp.start('build');
});
