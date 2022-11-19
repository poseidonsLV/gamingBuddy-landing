const { src, dest, series, watch } = require("gulp");
const sass = import("gulp-sass");
const uglify = import("gulp-uglify");
const concat = import("gulp-concat");
const imagemin = import("gulp-imagemin");
const browserSync = require("browser-sync").create();

function copyHTML() {
  return src("src/*.html").pipe(dest("public")).pipe(browserSync.stream());
}

function styleTask() {
  return src("src/assets/scss/*.scss")
    .pipe(sass())
    .pipe(dest("public/styles"))
    .pipe(browserSync.stream());
}

function jsTask() {
  return src("src/assets/js/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(dest("public/js"))
    .pipe(browserSync.stream());
}

function imageTask() {
  return src("src/assets/images/*")
    .pipe(imagemin())
    .pipe(dest("public/images"));
}

function browsersyncServe() {
  browserSync.init({
    server: { baseDir: "public" },
  });

  const html = watch(['src/*.html']);
  const styles = watch(['src/assets/scss/*.scss']);
  const js = watch(['src/assets/js/*.js']);

  html.on('change', function(path, stats) {
    copyHTML();
  });

  styles.on('change', function(path, stats) {
    styleTask();
  });

  js.on('change', function(path, stats) {
    jsTask();
  });
}

exports.default = browsersyncServe
