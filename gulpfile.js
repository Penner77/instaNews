const gulp = require("gulp");
const terser = require("gulp-terser");
const rename = require("gulp-rename");
const browserSync = require("browser-sync");
const eslint = require("gulp-eslint");
const prettyError = require("gulp-prettyerror");

gulp.task("lint", function(){
    return gulp
        .src(["./js/*js"])
        .pipe(prettyError())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
});

gulp.task(
    "scripts", 
    gulp.series("lint", function() {
  return gulp
    .src("./js/*.js")
    .pipe(terser())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest("./build/js"));
}));

gulp.task("browser-sync", function(done){
    browserSync.init({
        server: {
            baseDir: "./" //this is "browser sync init", syncing browser sync with the root directory aka index.html
        }
    });

        //have broswer sync reload when we change files
        gulp.watch(["index.html", "css/*.css", "build/js/*.js"])
        .on("change", browserSync.reload);

});

gulp.task("watch", function() {
    gulp.watch("js/*.js", gulp.series("scripts"));
});

gulp.task("default", gulp.parallel("browser-sync", "watch")); 
//"parellel just runs everything above, think of it like turning the page on it's side and pouring all the functions into pipes for processing
