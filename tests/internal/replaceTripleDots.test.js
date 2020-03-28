const path = require('path')
const replaceTripleDots = require('../../src/internal/replaceTripleDots')

test('is a function', () => {
  expect(replaceTripleDots).toEqual(expect.any(Function))
})

test('returns **/* for ***', () => {
  expect(replaceTripleDots('***')).toEqual(path.normalize('**/*'))
  expect(replaceTripleDots('dir/***')).toEqual(path.normalize('dir/**/*'))
})
