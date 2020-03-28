'use strict'

const path = require('path')
const stringSimilarity = require('string-similarity')

module.exports = function replaceAtPath (root, pathList, pathString) {
  return pathString.replace(/^\s*@([\w-]*)/, (_, atPath) => {
    if (atPath === '' || atPath === 'root') {
      return root
    }

    if (pathList.includes(atPath)) {
      return path.join(root, atPath)
    }

    const { bestMatch } = stringSimilarity.findBestMatch(atPath, pathList)

    if (bestMatch.rating === 0) {
      throw new Error(`Path @${atPath} doesn't exist. Available paths: @${pathList.join(', @')}`)
    }

    throw new Error(`Path @${atPath} doesn't exist. Did you mean @${bestMatch.target}?`)
  })
}
