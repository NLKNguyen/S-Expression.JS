const test = require('tape')
const SExpr = require('../index')

test('flat list', function (t) {
  const S = new SExpr()
  t.plan(4)
  t.deepEqual(S.parse('(1 2 3)'), [1, 2, 3])
  t.deepEqual(S.serialize([1, 2, 3]), '(1 2 3)')

  t.deepEqual(S.parse('(a 1 "cd ef ( )")'), ['a', 1, '"cd ef ( )"'])
  t.deepEqual(S.serialize(['a', 1, '"cd ef ( )"']), '(a 1 "cd ef ( )")')
})


test('type checks', function (t) {
  const S = new SExpr()
  const node = S.parse('(a 1 "c d e" true #t false #f null #nil ())')
  t.plan(5)
  t.true(S.isIdentifier(node[0]))
  t.true(S.isNumber(node[1])); t.false(S.isIdentifier(node[1]))
  t.true(S.isString(node[2])); t.false(S.isIdentifier(node[2]))
  // TODO: more tests
})
