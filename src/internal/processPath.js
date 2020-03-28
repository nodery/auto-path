'use strict'

const path = require('path')
const replaceAtPath = require('./replaceAtPath')
const replaceTripleDots = require('./replaceTripleDots')

module.exports = function processPath (root, dirs, paths) {
  let joinedPath = ''

  paths.forEach((p, index) => {
    if (typeof p !== 'string') {
      throw new Error(`Path must be a string, got: "${p}" (typeof === "${typeof p}").`)
    }

    if (index === 0) {
      joinedPath = replaceAtPath(root, dirs, p)
    } else {
      joinedPath = path.join(joinedPath, p)
    }
  })

  return path.normalize(replaceTripleDots(joinedPath))
}
