const replaceTripleDots = require('../../src/internal/replaceTripleDots')

test('is a function', () => {
  expect(replaceTripleDots).toEqual(expect.any(Function))
})

test('returns **/* for ***', () => {
  expect(replaceTripleDots('***')).toEqual('**/*')
  expect(replaceTripleDots('dir/***')).toEqual('dir/**/*')
})
