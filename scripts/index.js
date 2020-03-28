'use strict'

const path = require('path')
const gulp = require('gulp')
const del = require('del')
const delay = require('delay')
const debug = require('gulp-debug')

const root = path.resolve(__dirname, '../')

gulp.task('pre-build', async () => {
  del(`${root}/dist`, { force: true })

  await delay(500)

  gulp
    .src(`${root}/package.json`)
    .pipe(debug())
    .pipe(gulp.dest(`${root}/dist`))
})

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
