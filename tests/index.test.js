const nodePath = require('path')
const path = require('../src')

const root = nodePath.resolve(__dirname, './fixtures/dirs')

test('is a function', () => {
  expect(path).toEqual(expect.any(Function))
})

test('list all dirs', () => {
  path.__root = root

  expect(path('@')).toStrictEqual(root)
  expect(path('@/')).toStrictEqual(`${root}/`)

  expect(path('@/src')).toStrictEqual(`${root}/src`)
  expect(path('@/src/')).toStrictEqual(`${root}/src/`)
})
