'use strict'

const path = require('path')
const gulp = require('gulp')
const del = require('del')
const delay = require('delay')
const debug = require('gulp-debug')

const root = path.resolve(__dirname, '../')

gulp.task('build:clean', async () => {
  del(`${root}/dist`, { force: true })
  await delay(500)
})

gulp.task('build:copy', async () => {
  gulp
    .src([
      `${root}/README*`,
      `${root}/LICENSE*`,
      `${root}/package.json`,
      `${root}/src/**/*.js`
    ])
    .pipe(debug())
    .pipe(gulp.dest(`${root}/dist`))
})

gulp.task('build', gulp.series('build:clean', 'build:copy'))
