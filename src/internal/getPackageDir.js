'use strict'

const pkgDir = require('pkg-dir')

module.exports = () => pkgDir.sync()
