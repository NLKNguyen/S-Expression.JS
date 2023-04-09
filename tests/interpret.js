const test = require("tape")
const util = require("util")
const colorize = require("json-colorizer")
const _ = require("lodash")
const SExpr = require("../index")

// -----------------------------------------------------------------------------
test("interpret method", async function (t) {
  const S = new SExpr()
  let testCases = [
    {
      note: "root list",
      input: "(a b c)",
      parsingOpts: { includedRootParentheses: true },
      expect: {
        [S.ROOT]: [
          {
            [S.ATOM]: "a",
          },
          {
            [S.ATOM]: "b",
          },
          {
            [S.ATOM]: "c",
          },
        ],
      },
    },
    {
      input: "((a b c))",
      parsingOpts: { includedRootParentheses: true },
      expect: {
        [S.ROOT]: [
          {
            a: [
              {
                [S.ATOM]: "b",
              },
              {
                [S.ATOM]: "c",
              },
            ],
          },
        ],
      },
    },
    // {
    //   input: "((((a)) b c))",
    //   expect: [
    //     {
    //       a: [
    //         {
    //           "": "b",
    //         },
    //         {
    //           "": "c",
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      input: "((a b c) (d e f))",
      parsingOpts: { includedRootParentheses: true },
      expect: {
        [S.ROOT]: [
          {
            a: [
              {
                [S.ATOM]: "b",
              },
              {
                [S.ATOM]: "c",
              },
            ],
          },
          {
            d: [
              {
                [S.ATOM]: "e",
              },
              {
                [S.ATOM]: "f",
              },
            ],
          },
        ],
      },
    },
    {
      input: "(a (b c d) e (f) () (g h))",
      parsingOpts: { includedRootParentheses: true },
      expect: {
        [S.ROOT]: [
          {
            [S.ATOM]: "a",
          },
          {
            b: [
              {
                [S.ATOM]: "c",
              },
              {
                [S.ATOM]: "d",
              },
            ],
          },
          {
            [S.ATOM]: "e",
          },
          {
            f: [],
          },
          {},
          {
            g: [
              {
                [S.ATOM]: "h",
              },
            ],
          },
        ],
      },
    },
    {
      note: "multiline string",
      input: '(a "multi\n line\n string")',
      parsingOpts: { includedRootParentheses: true },
      expect: {
        [S.ROOT]: [
          {
            [S.ATOM]: "a",
          },
          "multi\n line\n string",
        ],
      },
    },
    {
      note: "multiline string with escaped quotes",
      input: '(a "multi\n line\n  string \\"with quotes\\"")',
      parsingOpts: { includedRootParentheses: true },
      expect: {
        "[ ROOT ]": [
          { "[ ATOM ]": "a" },
          'multi\n line\n  string "with quotes"',
        ],
      },
    },
    {
      note: "escape interpreting by switching off notation",
      context: {
        handlers: {
          QUOTE: {
            notation: null,
            evaluate: async (components, context, state, entity) => {
              // similar to the default [S.Function] evaluate
              return { [entity]: components }
            },
          },
        },
      },
      input: `(
        (quote 
          (
            some expressions to be retained as-is
          )
          (
            and not be interpreted as function notation
          )
        )
      )`,
      parsingOpts: { includedRootParentheses: true },
      expect: {
        "[ ROOT ]": [
          {
            quote: [
              ["some", "expressions", "to", "be", "retained", "as-is"],
              ["and", "not", "be", "interpreted", "as", "function", "notation"],
            ],
          },
        ],
      },
    },
  ]
  t.plan(testCases.length)
  for (let testCase of testCases) {
    if (testCase.note) {
      console.log("Test   : " + testCase.note)
    }
    const input = testCase.input
    console.log("Input  : " + JSON.stringify(input))

    const parsingOpts = testCase.parsingOpts
    const ast = S.parse(input, parsingOpts)
    // console.dir(ast)

    const context = testCase.context || {}
    // if (testCase.context) {
    //   console.dir({
    //     "testCase.context": testCase.context,
    //     context,
    //   })
    //   // process.exit()
    // }
    const output = await S.interpret(ast, context)
    console.log(
      "Output : " +
        colorize(output, {
          pretty: true,
        })
    )
    // console.log(util.inspect(output, {showHidden: false, depth: null, colors: true}))

    const expect = testCase.expect
    console.log("Expect : " + JSON.stringify(expect))

    t.deepEqual(output, expect)
    console.log("---")
  }
})

// TODO: simple DSL: key value
