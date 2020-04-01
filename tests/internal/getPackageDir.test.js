'use strict'

const path = require('path')
const getPackageDir = require('../../src/internal/getPackageDir')

test('is a function', () => {
  expect(getPackageDir).toEqual(expect.any(Function))
})

test('returns the absolute path to the closest package.json', () => {
  expect(getPackageDir()).toBe(path.resolve(__dirname, '../../'))
})
