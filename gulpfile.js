'use strict';
var gulp=require('gulp');
var less=require('gulp-less');
var cssnano=require('gulp-cssnano');
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');
var htmlmin=require('gulp-htmlmin');
var browserSync=require('browser-sync');

gulp.task('style',function () {
  gulp.src(['src/styles/*.less','!src/styles/_*.less'])
      // 也可以通过在‘styles’文件夹里新建一个文件夹来存放不希望被导走的.less文件
      .pipe(less())
      .pipe(cssnano())
      .pipe(gulp.dest('dist/styles'))
      .pipe(browserSync.reload({stream:true}));
});
// js的合并，压缩，混淆
gulp.task('script',function () {
  gulp.src('src/scripts/*.js')
      .pipe(concat('total.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/scripts'))
      .pipe(browserSync.reload({stream:true}));
}) ;
// 图片的复制
gulp.task('image',function () {
   gulp.src('src/images/*.*')
       .pipe(gulp.dest('dist/images'))
       .pipe(browserSync.reload({stream:true}));

}) ;
// HTML
gulp.task('html',function () {
  gulp.src('src/index.html')
      .pipe(htmlmin({collapseWhitespace:true,removeComments:true,removeAttributeQuotes:true}))
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.reload({stream:true}));
});

gulp.task('support',function () {
  browserSync({server:{baseDir:['dist']}}, function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
  });
  gulp.watch('src/*.html',['html']);
  gulp.watch('src/styles/*.less',['style']);
  gulp.watch('src/scripts/*.js',['script']);
  gulp.watch('src/images/*.*',['image']);
});
