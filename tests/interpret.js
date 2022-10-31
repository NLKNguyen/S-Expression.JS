const test = require("tape")
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
      input: `(a "multi\n line\n  string \\"with \nquotes\\"")`,
      expect: {
        [S.ROOT]: [
          {
            [S.ATOM]: "a",
          },
          'multi\n line\n  string "with \nquotes"',
        ],
      },
    },
  ]
  t.plan(testCases.length)
  for (let testCase of testCases) {
    if (testCase.note) {
      console.log("Test   : " + testCase.note)
    }
    let input = testCase.input
    console.log("Input  : " + JSON.stringify(input))

    let ast = S.parse(input)
    // console.dir(ast)
    let output = await S.interpret(ast)
    console.log(
      "Output : " +
        colorize(output, {
          pretty: true,
        })
    )

    let expect = testCase.expect
    console.log("Expect : " + JSON.stringify(expect))

    t.deepEqual(output, expect)
    console.log("---")
  }
})
