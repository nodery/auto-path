'use strict'

const path = require('path')
const processConfigFile = require('../../src/internal/processConfigFile')

const root = path.resolve(__dirname, '../fixtures/basic-structure')

test('is a function', () => {
  expect(processConfigFile).toEqual(expect.any(Function))
})

test('process empty config data', () => {
  expect(processConfigFile(root, {})).toStrictEqual({})
})

test('process a path value - with "@/" prefix', () => {
  const configData = { '@src': '@/src' }
  const processedData = { '@src': path.join(root, './src') }

  expect(processConfigFile(root, configData)).toStrictEqual(processedData)
})

test('process a path value - with "@*" prefix', () => {
  const configData = {
    '@root': './',
    '@src': '@root/src',
    '@src-assets': '@src/assets'
  }

  const processedData = {
    '@root': root,
    '@src': path.join(root, './src'),
    '@src-assets': path.join(root, './src/assets')
  }

  expect(processConfigFile(root, configData)).toStrictEqual(processedData)
})

test('process a path value - with leading "./"', () => {
  const configData = { '@src': './src' }
  const processedData = { '@src': path.join(root, './src') }

  expect(processConfigFile(root, configData)).toStrictEqual(processedData)
})

test('process a path value - without "@" prefix or leading "./"', () => {
  const configData = { '@src': 'src' }
  const processedData = { '@src': path.join(root, './src') }

  expect(processConfigFile(root, configData)).toStrictEqual(processedData)
})

test('throws an error, when config data is invalid', () => {
  const configData = { '_@src': 'src' }

  expect(() => { processConfigFile(root, configData) })
    .toThrowError(new Error('The path "_@src" must start with the "@" sign ' +
                            'and can contain only letters, numbers, underscores and dashes.'))
})
