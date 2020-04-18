'use strict'

const path = require('path')
const gulp = require('gulp')

const generator = require('./vendors/zengulp/jsdoc-to-markdown-generator')
const replacer = require('./vendors/zengulp/embedded-doc-template-replacer')

const root = path.resolve(__dirname, '../')
const plugin = '@richrdkng/dmd-plugin-simple-nodejs-project'

gulp.task('copy-files', async () => {
  gulp
    .src([
      `${root}/README*`,
      `${root}/LICENSE*`,
      `${root}/src/**/*.js`
    ])
    .pipe(gulp.dest(`${root}/dist`))
})

gulp.task('build:docs:api', async () => {
  gulp
    .src(`${root}/src/index.js`)
    .pipe(generator({
      rename: 'API.md',
      plugin
    }))
    .pipe(gulp.dest(`${root}/docs`))
})

gulp.task('build:docs:readme', async () => {
  const api = generator.fromFile(`${root}/src/index.js`, { plugin })

  gulp
    .src(`${root}/README*`)
    .pipe(replacer({ api }))
    .pipe(gulp.dest(`${root}`))
})

gulp.task('build',
  gulp.series(
    'build:docs:readme',
    gulp.parallel(
      'copy-files',
      'build:docs:api'
    )
  )
)
