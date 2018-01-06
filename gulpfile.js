var gulp = require('gulp');
var gulpJson = require('gulp-json');
var fs = require('fs');

var subdomainsJsonContent = JSON.parse(fs.readFileSync('subdomains.json'));
console.log(subdomainsJsonContent['smolensk'].city);



gulp.task('json', function () {
    
    gulp.src('subdomains.json')
        .pipe(gulp.dest('configs'));
});

// gulp.task('json-test', function() {
//     return gulp.src('./examples/test1.html')
//       .pipe(data(function(file) {
//         return JSON.parse(fs.readFileSync('./examples/subdomains.json'));
//       }))
//       .pipe(swig())
//       .pipe(gulp.dest('build'));
//   });