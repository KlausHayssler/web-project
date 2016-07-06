var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssfont64 = require('gulp-cssfont64'),
    browserSync = require('browser-sync').create();

// сервер + sass перезагрузка
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "public"
    });

    gulp.watch(["app/sass/*.sass", "app/sass/*.css", "app/sass/*.scss"], ['sass']);
    gulp.watch("public/*.html").on('change', browserSync.reload);
    gulp.watch("public/js/*.js").on('change', browserSync.reload);
    gulp.watch("app/fonts/*.ttf", ["fonts"]);
});

// махинация со шрифтами
gulp.task('fonts', function () {
	gulp.src(['app/fonts/*.ttf', 'app/fonts/*.otf'])
		.pipe(cssfont64())
		.pipe(gulp.dest('public/css'));
});

// компилируем sass
gulp.task('sass', function() {
    return gulp.src(['app/sass/**/*.sass']) // берем источник
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) // преобразуем sass в css
    .pipe(gulp.dest('public/css')) // выгружаем рузельтат
    .pipe(browserSync.stream());
});

// запуск галпа
gulp.task('default', ['serve']);