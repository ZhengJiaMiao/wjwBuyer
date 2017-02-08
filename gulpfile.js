'use strict';

var gulp = require('gulp');

//css压缩
var cssnano = require('gulp-cssnano');
gulp.task('style', function() {
	gulp.src('src/style/*.css')
		.pipe(cssnano())
		.pipe(gulp.dest('dist/style'))
		.pipe(browserSync.reload({
			stream: true
		}));
});
//js合并 压缩 混淆
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
gulp.task('script', function() {
	gulp.src('src/js/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.reload({
			stream: true
		}));
});
//复制图片
gulp.task('image', function() {
	gulp.src('src/images/*.*')
		.pipe(gulp.dest('dist/images'))
		.pipe(browserSync.reload({
			stream: true
		}));
});
//html处理
var htmlmin = require('gulp-htmlmin');
gulp.task('html', function() {
	gulp.src('src/*.html')
		.pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({
			stream: true
		}));
});
//创建本地服务器,并监听文件变化
var browserSync = require('browser-sync');
gulp.task('serve', function() {
	browserSync({
		server: {
			baseDir: ['dist']
		}
	}, function(err, bs) {
	    console.log(bs.options.getIn(["urls", "local"]));
	});

	/*gulp.watch('src/style/*.less', ['style']);*/
	gulp.watch('src/style/*.css', ['style']);
	gulp.watch('src/js/*.js', ['script']);
	gulp.watch('src/images/*.*', ['image']);
	gulp.watch('src/*.html', ['html']);
});