'use strict'

const path = require('path')
const replaceAtPath = require('./replaceAtPath')

/**
 * Processes and returns the valid list of directories from the given config file data.
 *
 * @param {string} - The absolute path of the root directory.
 * @param {Object} - The raw data retrieved from a config file.
 *
 * @returns {Object} Returns the processed and validated list of directories.
 */
module.exports = (root, data) => {
  const paths = {}

  for (const [name, value] of Object.entries(data)) {
    if (/^@[\w-]*$/.test(name) === false) {
      throw new Error(`The path "${name}" must start with the "@" sign ` +
                      'and can contain only letters, numbers, underscores and dashes.')
    }

    let processedValue

    // check whether the value starts with an "@" prefix
    if (/^@[\w-]*/.test(value)) {
      processedValue = replaceAtPath(root, paths, value)

    // check whether the value is a current directory reference (e.g.: "." or "./")
    } else if (value === '.' || value === './') {
      processedValue = root

    // the value is a regular path segment
    } else {
      processedValue = path.join(root, value)
    }

    paths[name] = processedValue
  }

  return paths
}
