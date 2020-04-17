'use strict'

const path = require('path')
const gulp = require('gulp')
const debug = require('gulp-debug')

const root = path.resolve(__dirname, '../')

gulp.task('build', async () => {
  gulp
    .src([
      `${root}/README*`,
      `${root}/LICENSE*`,
      `${root}/src/**/*.js`
    ])
    .pipe(debug())
    .pipe(gulp.dest(`${root}/dist`))
})
