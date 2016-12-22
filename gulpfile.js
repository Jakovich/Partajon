var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var copy = require("gulp-contrib-copy");
var clean = require('gulp-contrib-clean');
var uglify = require("gulp-uglify");
var concat = require('gulp-concat');
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var imagemin = require("gulp-imagemin");
var csso = require("gulp-csso")
var server = require("browser-sync");
var rename = require("gulp-rename");
var spritesmith = require("gulp.spritesmith");

  


gulp.task('webpack', function() {
  return gulp.src('src/main.js')
  .pipe(webpack())
  .pipe(gulp.dest('scripts/'));
});


gulp.task("style", function(){
  gulp.src("less/style.less")
  
  .pipe(plumber())
  
  .pipe(less())
  
  .pipe(postcss([
    autoprefixer({browsers: [
      "last 3 version",
      "last 3 Chrome versions",
      "last 3 Firefox versions",
      "last 3 Opera versions",
      "last 2 Edge versions",
      "ie >= 8"
    ]})
    
    
  ]))
  
  .pipe(gulp.dest("build/css"))
  .pipe(csso())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css"))
  .pipe(server.reload({stream: true}));
  
  gulp.src("less/style_ie.less")
  .pipe(plumber())
  
  .pipe(less())
  .pipe(gulp.dest("build/css"))
  .pipe(csso())
  .pipe(rename("style_ie.min.css"))
.pipe(gulp.dest("build/css"))
});

gulp.task("minJs", function(){
  
  gulp.src("scripts/common/ie.js")
  
  .pipe(gulp.dest("build/scripts/"))
  .pipe(uglify())
  .pipe(rename("ie.min.js"))
  .pipe(gulp.dest("build/scripts/"))
  
  gulp.src("vendor/ionSlider/ion.rangeSlider.js")
  
  .pipe(gulp.dest("build/vendor/ionSlider/"))
  .pipe(uglify())
  .pipe(rename("ion.rangeSlider.min.js"))
  .pipe(gulp.dest("build/vendor/ionSlider/"))
  
});

gulp.task('concatCommonJs', function() {
  return gulp.src(['scripts/common/form-valid.js', 'scripts/common/common.js', 'scripts/common/bookmark.js'])
    .pipe(concat('common.js'))
    .pipe(gulp.dest('build/scripts/'))
    .pipe(uglify())
    .pipe(rename("common.min.js"))
    .pipe(gulp.dest("build/scripts/"))
});

gulp.task('concatFranchisesJs', function() {
  return gulp.src(['scripts/franchises/search.js', 'scripts/franchises/franchises-basic.js'])
    .pipe(concat('franchises.js'))
    .pipe(gulp.dest('build/scripts/'))
    .pipe(uglify())
    .pipe(rename("franchises.min.js"))
    .pipe(gulp.dest("build/scripts/"))
});

gulp.task('concatFranchiseJs', function() {
  return gulp.src(['scripts/franchise/franchise.js', 'scripts/franchise/form-valid.js', 'scripts/franchise/youtube.js'])
    .pipe(concat('franchise.js'))
    .pipe(gulp.dest('build/scripts/'))
    .pipe(uglify())
    .pipe(rename("franchise.min.js"))
    .pipe(gulp.dest("build/scripts/"))
});

gulp.task('concatFranchiseCreateJs', function() {
  return gulp.src('scripts/franchise-create/*.js')
    .pipe(concat('franchise-create.js'))
    .pipe(gulp.dest('build/scripts/'))
    .pipe(uglify())
    .pipe(rename("franchise-create.min.js"))
    .pipe(gulp.dest("build/scripts/"))
});

gulp.task('concatFranchiseRatingJs', function() {
  return gulp.src('scripts/franchise-rating/*.js')
    .pipe(concat('franchise-rating.js'))
    .pipe(gulp.dest('build/scripts/'))
    .pipe(uglify())
    .pipe(rename("franchise-rating.min.js"))
    .pipe(gulp.dest("build/scripts/"))
});

gulp.task('concatFranchiseAddJs', function() {
  return gulp.src('scripts/franchise-add/*.js')
    .pipe(concat('franchise-add.js'))
    .pipe(gulp.dest('build/scripts/'))
    .pipe(uglify())
    .pipe(rename("franchise-add.min.js"))
    .pipe(gulp.dest("build/scripts/"))
});

gulp.task("image", function(){
  return gulp.src("img/**/*.{png,jpg,gif}")
  .pipe(imagemin({
    optimizationLevel: 3,
    progressive: true 
  }))
  .pipe(gulp.dest("build/img"))
});

gulp.task("clean", function () {
  return gulp.src("build", {read: false})
    .pipe(clean());
});


gulp.task("copyHtml", function() {
  gulp.src("*.html")
  .pipe(copy())
  .pipe(gulp.dest("build"))
  gulp.src("*.ico")
  .pipe(copy())
  .pipe(gulp.dest("build"))
  gulp.src("fonts/**/*")
  .pipe(copy())
  .pipe(gulp.dest("build/fonts/"))
  
});

gulp.task("copyJs", function() {
  gulp.src("scripts/**/*")
  .pipe(copy())
  .pipe(gulp.dest("build/scripts/"))
  
});

gulp.task("copyVendor", function() {
  gulp.src("vendor/**/*")
  .pipe(copy())
  .pipe(gulp.dest("build/vendor"))
});



gulp.task("copyJslib", function() {
  gulp.src(['js/vendor/**/*'])
  .pipe(concat('lib.js'))
  .pipe(gulp.dest('build/js/vendor'))
  .pipe(uglify())
  .pipe(rename('lib.min.js'))
  .pipe(gulp.dest('build/js/vendor'))
});

gulp.task("franchise-sprite", function(){
  var spriteData = gulp.src('img/franchise/franchise-icons/*.png').pipe(spritesmith({
    imgName: 'franchise-sprite.png',
    cssName: 'franchise-sprite.less'
  }));
    spriteData.img.pipe(gulp.dest('img/franchise')); 
    spriteData.css.pipe(gulp.dest('less/sprites')); 
});

gulp.task("franchise-add-sprite", function(){
  var spriteData = gulp.src('img/franchise/franchise-create-icons/*.png').pipe(spritesmith({
    imgName: 'franchise-add-sprite.png',
    cssName: 'franchise-add-sprite.less'
  }));
    spriteData.img.pipe(gulp.dest('img/franchise')); 
    spriteData.css.pipe(gulp.dest('less/sprites')); 
});

gulp.task("franchise-add-sprite-sm", function(){
  var spriteData = gulp.src('img/franchise/franchise-create-icons-sm/*.png').pipe(spritesmith({
    imgName: 'franchise-add-sprite-sm.png',
    cssName: 'franchise-add-sprite-sm.less'
  }));
    spriteData.img.pipe(gulp.dest('img/franchise')); 
    spriteData.css.pipe(gulp.dest('less/sprites')); 
});


gulp.task("show", function(){
  server.init({
    server: "build",
    notify: false,
    open: true,
    ui: false
  });
  
  gulp.watch("less/**/*.less", ["style"]).on("change", server.reload);
  gulp.watch("vendor/**/*", ["copyVendor"]).on("change", server.reload);
  gulp.watch("*.html", ["copyHtml"]).on("change", server.reload);
  gulp.watch("scripts/common/*", ["concatCommonJs"]).on("change", server.reload);
  gulp.watch("scripts/franchises/**/*", ["concatFranchisesJs"]).on("change", server.reload);
  gulp.watch("scripts/franchise/**/*", ["concatFranchiseJs"]).on("change", server.reload);
  gulp.watch("scripts/franchise-create/**/*", ["concatFranchiseCreateJs"]).on("change", server.reload);
  gulp.watch("scripts/franchise-add/**/*", ["concatFranchiseAddJs"]).on("change", server.reload);
  gulp.watch("scripts/franchise-rating/**/*", ["concatFranchiseRatingJs"]).on("change", server.reload);
  gulp.watch("img/*", ["image"]).on("change", server.reload);
});

gulp.task("build", ["clean", "copyHtml", "copyJs", "copyVendor", "style", "minJs", "concatCommonJs", "concatFranchisesJs", "concatFranchiseCreateJs", "concatFranchiseRatingJs","concatFranchiseJs", "concatFranchiseAddJs", "image"]);
