'use strict'

const path = require('path')

const replaceAtPath = require('./replaceAtPath')
const replaceTripleDots = require('./replaceTripleDots')

/**
 * Processes the given path segments and returns the combined and normalized path.
 *
 * @param {string}          root         - The absolute path, to which the path segments will be joined.
 * @param {Object}          dirMap       - The map of @-prefixed directories, which can be used with the @ sign.
 * @param {string|string[]} pathSegments - The path segments to join to the root path.
 *
 * @returns {string} Returns the processed and normalized path.
 */
module.exports = (root, dirMap, pathSegments) => {
  let joinedPath = ''

  if (!Array.isArray(pathSegments)) {
    pathSegments = [pathSegments]
  }

  pathSegments.forEach((segment, index) => {
    if (typeof segment !== 'string') {
      throw new Error(`Path must be a string, got: "${segment}" (typeof === "${typeof segment}").`)
    }

    if (index === 0) {
      joinedPath = replaceAtPath(root, dirMap, segment)
    } else {
      joinedPath = path.join(joinedPath, segment)
    }
  })

  return replaceTripleDots(joinedPath)
}
