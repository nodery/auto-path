'use strict'

const nodePath = require('path')

const root = nodePath.resolve(__dirname, './fixtures/basic-structure')
const mockRoot = root

jest.mock('../src/internal/getPackageDir.js', () => () => mockRoot)

const path = require('../src')

test('is a function', () => {
  expect(path).toEqual(expect.any(Function))
})

test('access the project\'s root directory with the "@" sign', () => {
  expect(path('@')).toStrictEqual(root)
})

test('use the "@/" prefix', () => {
  expect(path('@/')).toStrictEqual(nodePath.normalize(`${root}/`))
  expect(path('@/src')).toStrictEqual(nodePath.normalize(`${root}/src`))
  expect(path('@/src/')).toStrictEqual(nodePath.normalize(`${root}/src/`))
})

test('use the "@*" prefix - for prefetched, existing directories', () => {
  expect(path('@dist')).toStrictEqual(nodePath.normalize(`${root}/dist`))
  expect(path('@dist/')).toStrictEqual(nodePath.normalize(`${root}/dist/`))

  expect(path('@src')).toStrictEqual(nodePath.normalize(`${root}/src`))
  expect(path('@src/')).toStrictEqual(nodePath.normalize(`${root}/src/`))

  expect(path('@vendors')).toStrictEqual(nodePath.normalize(`${root}/vendors`))
  expect(path('@vendors/')).toStrictEqual(nodePath.normalize(`${root}/vendors/`))
})

test('use the "@*" prefix - for paths loaded from a config file', () => {
  expect(path('@assets')).toStrictEqual(nodePath.normalize(`${root}/src/assets`))
  expect(path('@assets/')).toStrictEqual(nodePath.normalize(`${root}/src/assets/`))
})

test('throws errors, when using the "@*" prefix for non-existent paths', () => {
  expect(() => { path('@non-existent') })
    .toThrowError(new Error("Path @non-existent doesn't exist. Did you mean @dist?"))

  expect(() => { path('@non-existent/') })
    .toThrowError(new Error("Path @non-existent doesn't exist. Did you mean @dist?"))

  expect(() => { path('@non-existent/path/') })
    .toThrowError(new Error("Path @non-existent doesn't exist. Did you mean @dist?"))
})
