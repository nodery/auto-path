'use strict'

const path = require('path')
const fs = require('fs')

const filenames = [
  '.pathrc',
  '.pathsrc',
  '.path.config.js',
  '.paths.config.js',
  '.path.json',
  '.paths.json',
  '.path.yml',
  '.paths.yml',
  '.path.yaml',
  '.paths.yaml'
]

/**
 * Searches and returns the config filename's full path.
 *
 * @param {string} dir - The absolute path of the directory in which the config file will be searched for.
 *
 * @returns {string|null} Returns the config filename or null if no config filename exists.
 *                        If there are several accepted or possible config filenames exist,
 *                        only the very first will be returned based on the given array of filenames.
 */
module.exports = dir => {
  const paths = fs.readdirSync(dir)
  const filteredPaths = paths.filter(path => filenames.includes(path))

  // rearrange to have the same order as in filenames
  filteredPaths.sort((a, b) => filenames.indexOf(a) - filenames.indexOf(b))

  // if there's no config file
  if (filteredPaths.length === 0) {
    return null
  }

  return path.join(dir, filteredPaths[0])
}
