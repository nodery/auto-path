'use strict'

const path = require('path')
const getDirMap = require('../../src/internal/getDirMap')

const paths = {
  basicStructure: path.resolve(__dirname, '../fixtures/basic-structure'),
  emptyDir: path.resolve(__dirname, '../fixtures/empty-dir')
}

test('is a function', () => {
  expect(getDirMap).toEqual(expect.any(Function))
})

test('list no directories, when there\'s none', () => {
  expect(getDirMap(paths.emptyDir)).toStrictEqual({})
})

test('list all existing directories (except dotdirs)', () => {
  expect(getDirMap(paths.basicStructure)).toStrictEqual({
    '@dist': path.join(paths.basicStructure, '/dist'),
    '@src': path.join(paths.basicStructure, '/src'),
    '@vendors': path.join(paths.basicStructure, '/vendors')
  })
})
