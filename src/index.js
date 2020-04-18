'use strict'

/**
 * @module @nodewell/path
 */

const getPackageDir = require('./internal/getPackageDir')
const getDirMap = require('./internal/getDirMap')
const getConfigFilePath = require('./internal/getConfigFilePath')
const loadConfigFile = require('./internal/loadConfigFile')
const processConfigFile = require('./internal/processConfigFile')
const processPath = require('./internal/processPath')

const packageDir = getPackageDir()
const dirMap = getDirMap(packageDir)

const configPath = getConfigFilePath(packageDir)
const rawConfigData = loadConfigFile(configPath)
const configData = processConfigFile(packageDir, rawConfigData)

/**
 * Processes and returns the path segments.
 *
 * @param {string|string[]} paths - The path segments to process.
 *
 * @returns {string} Returns the processed path segments.
 *
 * @example <caption>General Usage</caption>
 * const path = require('@nodewell/path')
 *
 * path('@') // will print out the project's root directory
 * path('@/src') // e.g.: 'project_root/src'
 * path('@/src/*.js') // e.g.: 'project_root/src/*.js'
 */
module.exports = (...paths) => {
  return processPath(packageDir, { ...dirMap, ...configData }, paths)
}
