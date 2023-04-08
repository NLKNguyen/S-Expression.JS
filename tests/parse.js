const test = require("tape")
const colorize = require("json-colorizer")
const SExpr = require("../index")

// -----------------------------------------------------------------------------
test("parse method", function (t) {
  const S = new SExpr()
  let testCases = [
    {
      input: `( 1 "a \\"b\\" c" true null d (e f ()) )`,
      expect: [1, '"a "b" c"', "true", "null", "d", ["e", "f", []]],
      opts: { includedRootBrackets: true }
    },
  ]
  t.plan(testCases.length)
  for (let testCase of testCases) {
    if (testCase.note) {
      console.log("Note   : " + testCase.note)
    }
    const input = testCase.input
    console.log(`Input  : ${colorize(JSON.stringify(input))}`)

    const expect = testCase.expect
    console.log(`Expect : ${colorize(JSON.stringify(expect))}`)

    const opts = testCase.opts
    let ast = S.parse(input, opts)

    const output = ast
    console.log(
      "Output : " +
        colorize(output, {
          pretty: false,
        })
    )

    console.log(`---`)
    
    if (S.isExpression(ast)) {
      console.log(`ast is an expression: ${colorize(JSON.stringify(ast))}`)
    } else {
      console.log(`ast is not a valid expression:`)
      console.log(ast)
    }

    let index = 0
    for (let e of ast) {
      if (S.isNumber(e)) {
        console.log(
          `ast[${index}] is a number with value: ${colorize(S.valueOf(e))}`
        )
      } else if (S.isString(e)) {
        console.log(
          `ast[${index}] is a string with value: ${colorize(
            JSON.stringify(S.valueOf(e))
          )}`
        )
      } else if (S.isBoolean(e)) {
        console.log(
          `ast[${index}] is a boolean with value: ${colorize(S.valueOf(e))}`
        )
      } else if (S.isNull(e)) {
        console.log(`ast[${index}] is null: ${S.valueOf(e)}`)
      } else if (S.isAtom(e)) {
        console.log(`ast[${index}] is an atom with id: ${S.valueOf(e)}`)
      } else {
        // S.isExpression(e)
        console.log(
          `ast[${index}] is an expression: ${colorize(JSON.stringify(e))}`
        )
      }
      index++
    }
    console.log(`---`)

    t.deepEqual(output, expect)
    console.log("---")
    console.log()
  }
})

