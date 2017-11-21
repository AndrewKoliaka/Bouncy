'use strict';
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cssnano = require('gulp-cssnano'),
    plumber = require('gulp-plumber'),
    spritesmith = require('gulp.spritesmith'),
    svgSprite = require('gulp-svg-sprite'),
    connect = require('gulp-connect'),
    pug = require('gulp-pug'),
    del = require('del');

var path = {
    build: {
        html: 'public/',
        js: 'public/js/',
        css: 'public/css/',
        img: 'public/img/',
        fonts: 'public/fonts/',
        svgIcons: 'public/'
    },
    prod: {
        html: 'prod/',
        js: 'prod/js/',
        css: 'prod/css/',
        img: 'prod/img/',
        fonts: 'prod/fonts/'
    },
    src: {
        pug: 'src/*.pug',
        js: ['src/js/main.js'],
        style: 'src/sass/style.scss',
        sprite_scss: 'src/sass/utils/',
        img: 'src/img/**/*.*',
        sprite_img: 'src/icons/*.png',
        fonts: 'src/fonts/**/*.*',
        svgIcons: 'src/icons/*.svg'
    },
    watch: {
        pug: 'src/**/*.pug',
        js: 'src/js/**/*.js',
        style: 'src/sass/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        svgIcons: 'src/icons/*.svg'
    },
    clean: './build'
};

gulp.task('webserver', function () {
    connect.server({
        root: path.build.html,
        livereload: true,
        port: 3000
    });
});

gulp.task('del', function (cb) {
    del(['./public', './prod']);
});

gulp.task('pug:build', function () {
    gulp.src(path.src.pug)
        .pipe(pug())
        .pipe(gulp.dest(path.build.html))
        .pipe(connect.reload());
});

gulp.task('pug:prod', function () {
    gulp.src(path.src.pug)
        .pipe(pug())
        .pipe(gulp.dest(path.prod.html));
});


gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(rigger())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(connect.reload());
});

gulp.task('js:prod', function () {
    gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(uglify())
        .pipe(gulp.dest(path.prod.js));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: false,
            errLogToConsole: true,
            outputStyle: 'expanded'
        }))
        .pipe(prefixer({ browsers: ['last 3 versions', 'IE >= 10'], cascade: false }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(connect.reload());
});

gulp.task('style:prod', function () {
    gulp.src(path.src.style)
        .pipe(plumber())
        .pipe(sass({
            sourceMap: false,
            errLogToConsole: true
        }))
        .pipe(prefixer({ browsers: ['last 3 versions', 'IE >= 10'], cascade: false }))
        .pipe(cssnano())
        .pipe(gulp.dest(path.prod.css))
        .pipe(connect.reload());
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(connect.reload());
});

gulp.task('image:prod', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.prod.img));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('fonts:prod', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.prod.fonts))
});

gulp.task('sprite-create', function () {

    var spriteData = gulp.src(path.src.sprite_img)
        .pipe(spritesmith({
            imgName: '../img/spritesheet.png',
            cssName: '_sprite.scss',
            cssFormat: 'scss',
            padding: 5
        }));

    spriteData.img.pipe(gulp.dest(path.build.img));

    spriteData.css.pipe(gulp.dest(path.src.sprite_scss));

    return spriteData;
});

gulp.task('sprite-create:prod', function () {

    var spriteData = gulp.src(path.src.sprite_img)
        .pipe(spritesmith({
            imgName: '../img/spritesheet.png',
            cssName: '_sprite.scss',
            cssFormat: 'scss',
            padding: 5
        }));

    spriteData.img.pipe(gulp.dest(path.prod.img));

    spriteData.css.pipe(gulp.dest(path.src.sprite_scss));

    return spriteData;
});


gulp.task('svg:build', function () {
    return gulp.src(path.src.svgIcons)
        .pipe(svgSprite({
            mode: {
                symbol: {
                    dest: "./",
                    sprite: 'img/sprite'
                }
            },
            shape: {
                spacing: {
                    padding: 0
                }
            },
            variables: {
                mapname: "sprite"
            }
        }))
        .pipe(gulp.dest('./public'));
});

gulp.task('build', [
    'pug:build',
    'js:build',
    'sprite-create',
    'svg:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

gulp.task('prod', [
    'pug:prod',
    'js:prod',
    'sprite-create:prod',
    'svg:build',
    'style:prod',
    'fonts:prod',
    'image:prod'
]);


gulp.task('watch', function(){
    watch([path.watch.pug], function(event, cb) {
        gulp.start('pug:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.src.sprite_img], function(event, cb) {
        gulp.start('sprite-create');
    });
    watch([path.src.svgIcons], function(event, cb) {
        gulp.start('svg:build');
    });
});


gulp.task('default', ['build', 'webserver', 'watch']);
