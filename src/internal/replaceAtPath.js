'use strict'

const p = require('path')
const stringSimilarity = require('string-similarity')

/**
 * Replaces the given path and returns the processed and normalized path.
 *
 * @private
 * @param {string} root   - The absolute path, to which the path will be joined.
 * @param {Object} dirMap - The map of @-prefixed directories, which can be used with the @ sign.
 * @param {string} path   - The path to join to the root path.
 *
 * @returns {string} Returns the processed and normalized path.
 */
module.exports = (root, dirMap, path) => {
  const replacedPathString = path.replace(/^@[\w-]*/, atPath => {
    if (atPath === '@') {
      return root
    }

    if (atPath in dirMap) {
      return dirMap[atPath]
    }

    const pathNames = Object.keys(dirMap)
    const { bestMatch } = stringSimilarity.findBestMatch(atPath, pathNames)

    if (bestMatch.rating === 0) {
      throw new Error(`Path ${atPath} doesn't exist. Available paths: ${pathNames.join(', ')}`)
    }

    throw new Error(`Path ${atPath} doesn't exist. Did you mean ${bestMatch.target}?`)
  })

  return p.normalize(replacedPathString)
}
