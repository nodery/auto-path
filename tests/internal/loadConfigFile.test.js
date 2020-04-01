'use strict'

const path = require('path')
const loadConfigFile = require('../../src/internal/loadConfigFile')

const fixtures = path.resolve(__dirname, '../fixtures')
const configs = {
  filenames: {
    custom: path.resolve(fixtures, 'configs/filenames/custom'),
    supported: path.resolve(fixtures, 'configs/filenames/supported'),
    unsupported: path.resolve(fixtures, 'configs/filenames/unsupported'),
    empty: path.resolve(fixtures, 'configs/filenames/empty')
  }
}

const configData = {
  '@': './',
  '@src': './frontend/src',
  '@custom-path': '@/custom/path'
}

test('is a function', () => {
  expect(loadConfigFile).toEqual(expect.any(Function))
})

test('loads a JSON file', () => {
  const data = loadConfigFile(path.resolve(configs.filenames.supported, '.pathrc'))
  expect(data).toStrictEqual(configData)
})

test('loads a JavaScript file', () => {
  const data = loadConfigFile(path.resolve(configs.filenames.supported, '.path.config.js'))
  expect(data).toStrictEqual(configData)
})

test('loads a YAML file', () => {
  const data1 = loadConfigFile(path.resolve(configs.filenames.supported, '.path.yml'))
  expect(data1).toStrictEqual(configData)

  const data2 = loadConfigFile(path.resolve(configs.filenames.supported, '.path.yaml'))
  expect(data2).toStrictEqual(configData)
})

test('returns an empty Object, when the given path is falsy', () => {
  expect(loadConfigFile(null)).toStrictEqual({})
})

test('throws an error, when the path doesn\'t exist', () => {
  const nonExistentPath = path.join(configs.filenames.empty, '/non-existent')

  expect(() => { loadConfigFile(nonExistentPath) })
    .toThrowError(new Error(`The path "${nonExistentPath}" doesn't exist.`))
})

test('throws an error, when the path is not a file', () => {
  const notAFilePath = path.join(configs.filenames.empty)

  expect(() => { loadConfigFile(notAFilePath) })
    .toThrowError(new Error(`The path "${notAFilePath}" must point to a file.`))
})

test('throws an error, when the config file is an unsupported file', () => {
  const unsupportedFilePath = path.resolve(configs.filenames.unsupported, '.path.unsupported')

  expect(() => { loadConfigFile(unsupportedFilePath) })
    .toThrowError(new Error(`The file "${unsupportedFilePath}" must be a JSON, JavaScript, or YAML file.`))
})
