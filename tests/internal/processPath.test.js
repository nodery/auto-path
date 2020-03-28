const path = require('path')
const getDirs = require('../../src/internal/getDirs')
const processPath = require('../../src/internal/processPath')

const root = path.resolve(__dirname, '../fixtures/dirs')
const dirs = getDirs(root, root, [])

test('is a function', () => {
  expect(processPath).toEqual(expect.any(Function))
})

test('returns root dir', () => {
  expect(processPath(root, dirs, ['@'])).toBe(root)
  expect(processPath(root, dirs, ['@/'])).toBe(`${root}/`)
})

test('returns custom dirs relative to root', () => {
  expect(processPath(root, dirs, ['@/dist'])).toBe(`${root}/dist`)
  expect(processPath(root, dirs, ['@/dist/'])).toBe(`${root}/dist/`)

  expect(processPath(root, dirs, ['@/src'])).toBe(`${root}/src`)
  expect(processPath(root, dirs, ['@/src/'])).toBe(`${root}/src/`)

  expect(processPath(root, dirs, ['@/vendors'])).toBe(`${root}/vendors`)
  expect(processPath(root, dirs, ['@/vendors/'])).toBe(`${root}/vendors/`)
})

test('returns joined path from path segments', () => {
  expect(processPath(root, dirs, ['@', '/src'])).toBe(`${root}/src`)
  expect(processPath(root, dirs, ['@', 'src'])).toBe(`${root}/src`)
  expect(processPath(root, dirs, ['@', 'src', '/'])).toBe(`${root}/src/`)
})

test('throws an error, when path segment is not a string', () => {
  expect(() => { processPath(root, dirs, [null]) })
    .toThrowError(new Error('Path must be a string, got: "null" (typeof === "object").'))
})
