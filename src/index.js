'use strict'

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
 * @param {string[]} paths - The path segments to process.
 *
 * @returns {string} Returns the processed path segments.
 */
module.exports = (...paths) => {
  return processPath(packageDir, { ...dirMap, ...configData }, paths)
}
