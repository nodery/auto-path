'use strict'

const fs = require('fs')
const p = require('path')
const yaml = require('yaml')

/**
 * Loads the config file from the given path.
 *
 * @param {string|null} path - The absolute path of the config file.
 *
 * @returns {Object} Returns the parsed config file data as an object.
 */
module.exports = path => {
  if (!path) {
    return {}
  }

  if (!fs.existsSync(path)) {
    throw new Error(`The path "${path}" doesn't exist.`)
  }

  if (!fs.statSync(path).isFile()) {
    throw new Error(`The path "${path}" must point to a file.`)
  }

  const filename = p.basename(path).toLowerCase()
  const content = fs.readFileSync(path, 'utf-8')

  let data = {}

  // load a JSON file
  if (filename.endsWith('rc') || filename.endsWith('.json')) {
    data = JSON.parse(content)

  // load a JavaScript file
  } else if (filename.endsWith('.js')) {
    data = require(path)

  // load a YAML file
  } else if (filename.endsWith('.yml') || filename.endsWith('.yaml')) {
    data = yaml.parse(content)

  // incompatible file type
  } else {
    throw new Error(`The file "${path}" must be a JSON, JavaScript, or YAML file.`)
  }

  return data
}
