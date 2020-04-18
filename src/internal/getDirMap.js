'use strict'

const fs = require('fs')
const p = require('path')

/**
 * Returns a map of @-prefixed directories in the given path relative to the given path.
 *
 * @private
 * @param {string} path - The absolute path, where all the directories will be mapped from.
 *
 * @returns {Object} Returns the @-prefixed directory map relative to the given path.
 */
module.exports = path => {
  const dirMap = {}
  const files = fs.readdirSync(path)

  files.forEach(file => {
    const absolutePath = p.join(path, file)
    const stat = fs.statSync(absolutePath)

    /* istanbul ignore else */
    if (stat.isDirectory()) {
      // skip dotdirs (directories start with a ".")
      if (file.startsWith('.')) {
        return
      }

      dirMap[`@${file}`] = absolutePath
    }
  })

  return dirMap
}
