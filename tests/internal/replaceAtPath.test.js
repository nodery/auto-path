'use strict'

const path = require('path')
const replaceAtPath = require('../../src/internal/replaceAtPath')

const root = 'rootDir'
const dirMap = {
  '@dist': path.normalize(`${root}/dist`),
  '@src': path.normalize(`${root}/src`),
  '@vendors': path.normalize(`${root}/vendors`)
}

test('is a function', () => {
  expect(replaceAtPath).toEqual(expect.any(Function))
})

test('returns root dir', () => {
  expect(replaceAtPath(root, {}, '@')).toEqual(root)
  expect(replaceAtPath(root, {}, '@/')).toEqual(path.normalize(`${root}/`))
})

test('returns existing dirs from a list', () => {
  expect(replaceAtPath(root, dirMap, '@dist')).toEqual(path.normalize(`${root}/dist`))
  expect(replaceAtPath(root, dirMap, '@dist/')).toEqual(path.normalize(`${root}/dist/`))

  expect(replaceAtPath(root, dirMap, '@src')).toEqual(path.normalize(`${root}/src`))
  expect(replaceAtPath(root, dirMap, '@src/')).toEqual(path.normalize(`${root}/src/`))

  expect(replaceAtPath(root, dirMap, '@vendors')).toEqual(path.normalize(`${root}/vendors`))
  expect(replaceAtPath(root, dirMap, '@vendors/')).toEqual(path.normalize(`${root}/vendors/`))
})

test('throws errors for non-existing dirs from a list', () => {
  expect(() => { replaceAtPath(root, dirMap, '@dest') })
    .toThrowError(new Error("Path @dest doesn't exist. Did you mean @dist?"))

  expect(() => { replaceAtPath(root, dirMap, '@qwerty') })
    .toThrowError(new Error("Path @qwerty doesn't exist. Available paths: @dist, @src, @vendors"))
})
