'use strict'

const path = require('path')
const getDirMap = require('../../src/internal/getDirMap')
const processPath = require('../../src/internal/processPath')

const root = path.resolve(__dirname, '../fixtures/basic-structure')
const dirs = getDirMap(root)

test('is a function', () => {
  expect(processPath).toEqual(expect.any(Function))
})

test('returns the root dir, when using the @ sign', () => {
  expect(processPath(root, dirs, '@')).toBe(root)
  expect(processPath(root, dirs, '@/')).toBe(path.normalize(`${root}/`))

  expect(processPath(root, dirs, ['@'])).toBe(root)
  expect(processPath(root, dirs, ['@/'])).toBe(path.normalize(`${root}/`))
})

test('returns existing @-path directories', () => {
  expect(processPath(root, dirs, '@dist')).toBe(path.normalize(`${root}/dist`))
  expect(processPath(root, dirs, '@dist/')).toBe(path.normalize(`${root}/dist/`))

  expect(processPath(root, dirs, '@src')).toBe(path.normalize(`${root}/src`))
  expect(processPath(root, dirs, '@src/')).toBe(path.normalize(`${root}/src/`))

  expect(processPath(root, dirs, '@vendors')).toBe(path.normalize(`${root}/vendors`))
  expect(processPath(root, dirs, '@vendors/')).toBe(path.normalize(`${root}/vendors/`))
})

test('returns non-existing directories using the @ sign', () => {
  expect(processPath(root, dirs, '@/custom')).toBe(path.normalize(`${root}/custom`))
  expect(processPath(root, dirs, '@/custom/')).toBe(path.normalize(`${root}/custom/`))

  expect(processPath(root, dirs, '@/new-dir')).toBe(path.normalize(`${root}/new-dir`))
  expect(processPath(root, dirs, '@/new-dir/')).toBe(path.normalize(`${root}/new-dir/`))

  expect(processPath(root, dirs, '@/temp')).toBe(path.normalize(`${root}/temp`))
  expect(processPath(root, dirs, '@/temp/')).toBe(path.normalize(`${root}/temp/`))
})

test('returns joined paths from path segments', () => {
  expect(processPath(root, dirs, ['@', '/src'])).toBe(path.normalize(`${root}/src`))
  expect(processPath(root, dirs, ['@', 'src'])).toBe(path.normalize(`${root}/src`))
  expect(processPath(root, dirs, ['@', 'src', '/'])).toBe(path.normalize(`${root}/src/`))
})

test('throws an error, when path segment is not a string', () => {
  expect(() => { processPath(root, dirs, null) })
    .toThrowError(new Error('Path must be a string, got: "null" (typeof === "object").'))
})
