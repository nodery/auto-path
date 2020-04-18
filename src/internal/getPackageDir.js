'use strict'

const pkgDir = require('pkg-dir')

/**
 * Returns package.json's directory upwards in process CWD.
 *
 * @private
 * @returns {string} Returns the directory, in which package.json can be found.
 */
module.exports = () => pkgDir.sync()
