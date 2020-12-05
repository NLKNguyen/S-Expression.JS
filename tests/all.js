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

test('isEqual', function (t) {
  const S = new SExpr()

  t.plan(9)
  t.true(S.isEqual(1, 1))
  t.true(S.isEqual('a', 'a'))
  t.true(S.isEqual([], []))
  t.true(S.isEqual([1, [2, [3, ['a b c d']]]], [1, [2, [3, ['a b c d']]]]))

  t.false(S.isEqual(1, 2))
  t.false(S.isEqual('a', ''))
  t.false(S.isEqual(['a'], []))
  t.false(S.isEqual([1, [2, [3, ['a b c d']]]], [1, [2, [3, [4]]]]))

  const node = S.expression()
  node.push(
    S.identifier('repeat'),
    S.number(3),
    S.expression(S.identifier('print'), S.string('Knock'))
  )

  const parsed = S.parse(`(repeat 3 (print "Knock"))`)

  t.true(S.isEqual(node, parsed))
})

test('type checks', function (t) {
  const S = new SExpr()
  const node = S.parse('(a 1 "c d e" true #t false #f null #nil ())')
  // const isExpectedType = (e, expectedPred) => {
  //   for(let pred of [S.isIdentifier, S.isString, S.isNumber, S.isBoolean]) {
  //     if (pred == expectedPred) {
  //       t.true(pred(e))
  //     } else {
  //       t.false(pred(e))
  //     }
  //   }
  // }
  // t.plan(4)
  // isExpectedType(node[0], S.isIdentifier)

  t.plan(21)

  t.true(S.isIdentifier(node[0]))
  t.equal(S.valueOf(node[0]), 'a')
  t.false(S.isString(node[0]))

  t.true(S.isNumber(node[1]))
  t.equal(S.valueOf(node[1]), 1)
  t.false(S.isIdentifier(node[1]))

  t.true(S.isString(node[2]))
  t.equal(S.valueOf(node[2]), 'c d e')
  t.false(S.isIdentifier(node[2]))
  
  t.true(S.isBoolean(node[3]))
  t.true(S.valueOf(node[3]))
  t.false(S.isIdentifier(node[3]))

  t.true(S.isBoolean(node[4]))
  t.true(S.valueOf(node[4]))
  t.false(S.isString(node[4]))

  t.true(S.isBoolean(node[5]))
  t.false(S.valueOf(node[5]))
  t.false(S.isString(node[5]))

  t.true(S.isBoolean(node[6]))
  t.false(S.valueOf(node[6]))
  t.false(S.isString(node[6]))
})



test('parsing', function (t) {
  t.plan(1)
  const S = new SExpr()

  const node = S.expression()
  node.push(
    S.identifier('repeat'),
    S.number(3),
    // S.number(3),
    S.expression(S.identifier('print'), S.string('Knock'))
  )
  
  const parsed = S.parse(`(repeat 3 (print "Knock"))`)
  
  // console.assert(S.isEqual(node, parsed))
  
  console.log(node)
  
  // same as S.isIdentifier(node[0]) && node[0] === 'repeat'
  if (S.isIdentifier(S.first(node), 'repeat')) {  
    if (node.length != 3) {
      console.error(`'repeat' expects 2 arguments: a number and an expression`)
      return
    }
    if (S.isNumber(S.second(node))) {
      const n = S.second(node) // same as node[1]
      const e = S.third(node) // same as node[2]
      if (S.isExpression(e)) {
        if (S.isIdentifier(S.first(e), 'print') && S.isString(S.second(e))) {
          for (let i = 0; i < n; ++i) {
            console.log(S.valueOf(S.second(e))) // S.valueOf is necessary for obtaining String value
          }
        } else {
          console.error(`'repeat' doesn't handle ${S.serialize(e)} expression`)
        }
      } else {
        console.error(`'repeat' expects an expression to be repeated`)
      }
    } else {
      console.error(`'repeat' expects a number of times to repeat an expression`)
    }
  }

  t.pass('parse normally')
  
})