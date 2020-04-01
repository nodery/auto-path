'use strict'

const path = require('path')
const getConfigFilePath = require('../../src/internal/getConfigFilePath')

const fixtures = path.resolve(__dirname, '../fixtures')
const configs = {
  filenames: {
    custom: path.resolve(fixtures, 'configs/filenames/custom'),
    supported: path.resolve(fixtures, 'configs/filenames/supported'),
    empty: path.resolve(fixtures, 'configs/filenames/empty')
  }
}

test('is a function', () => {
  expect(getConfigFilePath).toEqual(expect.any(Function))
})

test('finds no config files', () => {
  const configFilePath = getConfigFilePath(configs.filenames.empty)
  expect(configFilePath).toBe(null)
})

test('finds a config file based on default, supported config filenames', () => {
  const configFilePath = getConfigFilePath(configs.filenames.supported)
  expect(configFilePath).toBe(path.resolve(configs.filenames.supported, '.pathrc'))
})
