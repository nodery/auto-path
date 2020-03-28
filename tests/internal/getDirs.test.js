const path = require('path')
const getDirs = require('../../src/internal/getDirs')

const root = path.resolve(__dirname, '../fixtures/dirs')

test('is a function', () => {
  expect(getDirs).toEqual(expect.any(Function))
})

test('list all dirs', () => {
  expect(getDirs(root, root, [])).toStrictEqual(['dist', 'src', 'vendors'])
})

test('list all dirs except some excluded ones', () => {
  const excludedOne = ['vendors']
  const excludedTwo = ['src']
  const excludedThree = ['dist', 'vendors']

  expect(getDirs(root, root, excludedOne)).toStrictEqual(['dist', 'src'])
  expect(getDirs(root, root, excludedTwo)).toStrictEqual(['dist', 'vendors'])
  expect(getDirs(root, root, excludedThree)).toStrictEqual(['src'])
})
