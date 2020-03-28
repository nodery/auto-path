'use strict'

const pkgDir = require('pkg-dir')
const processPath = require('./internal/processPath')

const root = pkgDir.sync()

function path (...paths) {
  return processPath(path.__root, [], paths)
}

path.__root = root

module.exports = path
