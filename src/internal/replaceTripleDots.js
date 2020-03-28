'use strict'

const path = require('path')

module.exports = function replaceTripleDots (pathString) {
  return path.normalize(pathString.replace(/\*\*\*$/, `**${path.sep}*`))
}
