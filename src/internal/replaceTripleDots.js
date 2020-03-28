'use strict'

const path = require('path')

module.exports = function replaceTripleDots (pathString) {
  return pathString.replace(/\*\*\*$/, `**${path.sep}*`)
}
