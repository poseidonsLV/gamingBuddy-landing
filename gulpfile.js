const { src, dest, series, watch } = require("gulp");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
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

  watch("src/*.html").on("change", copyHTML);
  watch("src/assets/scss/*.scss").on("change", styleTask);
  watch("src/assets/js/*.js").on("change", jsTask);
}

exports.default = series(
  copyHTML,
  imageTask,
  styleTask,
  jsTask,
  browsersyncServe
);
