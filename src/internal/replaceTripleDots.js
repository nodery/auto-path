'use strict'

const path = require('path')

/**
 * Replaces the given *** (triple dots) path and returns the processed and normalized path.
 *
 * @private
 * @param {string} pathString - The path to process.
 *
 * @returns {string} Returns the processed and normalized path.
 */
module.exports = function replaceTripleDots (pathString) {
  return path.normalize(pathString.replace(/\*\*\*$/, `**${path.sep}*`))
}
