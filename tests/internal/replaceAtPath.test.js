const path = require('path')
const replaceAtPath = require('../../src/internal/replaceAtPath')

test('is a function', () => {
  expect(replaceAtPath).toEqual(expect.any(Function))
})

test('returns root dir', () => {
  const root = 'rootDir'

  expect(replaceAtPath(root, [], '@')).toEqual(root)
  expect(replaceAtPath(root, [], '@/')).toEqual(path.normalize(`${root}/`))

  expect(replaceAtPath(root, [], '@root')).toEqual(root)
  expect(replaceAtPath(root, [], '@root/')).toEqual(path.normalize(`${root}/`))
})

test('returns existing dirs from a list', () => {
  const root = 'rootDir'
  const pathList = [
    'dist',
    'src',
    'vendors'
  ]

  expect(replaceAtPath(root, pathList, '@dist')).toEqual(path.normalize(`${root}/dist`))
  expect(replaceAtPath(root, pathList, '@dist/')).toEqual(path.normalize(`${root}/dist/`))

  expect(replaceAtPath(root, pathList, '@src')).toEqual(path.normalize(`${root}/src`))
  expect(replaceAtPath(root, pathList, '@src/')).toEqual(path.normalize(`${root}/src/`))

  expect(replaceAtPath(root, pathList, '@vendors')).toEqual(path.normalize(`${root}/vendors`))
  expect(replaceAtPath(root, pathList, '@vendors/')).toEqual(path.normalize(`${root}/vendors/`))
})

test('throws errors for non-existing dirs from a list', () => {
  const root = 'rootDir'
  const pathList = [
    'dist',
    'src',
    'vendors'
  ]

  expect(() => { replaceAtPath(root, pathList, '@dest') })
    .toThrowError(new Error("Path @dest doesn't exist. Did you mean @dist?"))

  expect(() => { replaceAtPath(root, pathList, '@qwerty') })
    .toThrowError(new Error("Path @qwerty doesn't exist. Available paths: @dist, @src, @vendors"))
})
