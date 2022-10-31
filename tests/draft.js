const test = require("tape")
const colorize = require("json-colorizer")
const _ = require("lodash")
const SExpr = require("../index")


/* 
test("random DSL", async function (t) {
  const S = new SExpr()
  t.plan(1)
  const input = `(    
    (def a "AAA")
    (test)
    (WHEN "$[RENDER_KROKI]")
    ;(filters 
    ;  (JSON 
    ;      (convert-from "markdown"))
    ;  (JSON 
    ;      (evaluate "$[type='code'].text"))
    ;  (zlibDeflate)
    ;  (String 
    ;      (format "https://kroki.io/<%= type %>/svg/%s"))
    ;  (HttpGet 
    ;      (except "$[status!=200]"))        
    ;  (Execute 
    ;      (command "inkscape --pipe --export-filename=<%= output %>") 
    ;      (except "$[stderr=error]"))
    ;
    ;  (Save (file "<%= output %>"))               
    ;)
    ;(ORDER "100")    
    ;"Yo"
  )`

  let ast = S.parse(input)
  // console.dir(ast)
  let output = await S.interpret(ast, {
    // notation: "functional", // default
    handlers: {
      ORDER: {
        params: {
          type: "array",
          items: [{ type: "integer" }, { type: "string" }],
        },

        arguments: [
          // "string | numeric", "[string]", "[string | numeric]", "[]"
          { type: "atom", prefix: ":" },
          { type: "integer" },
          // S.Type.Atom({}),
          // S.Type.String({})
          // S.Type.Variadic({min:0, max:10, oneOf: [ S.Type.String({})]},)
        ],
      },
      FILTERS: {
        handlers: {
          [S.FUNCTION]: {
            evaluate: async function (data, mode, state, entity) {
              // console.dir({ action, args })
              return { [entity]: data }
            },
          },
        },
        evaluate: async function (data, mode, state, entity) {
          // for (let filter of args) {
          //   console.log(
          //     colorize(filter, {
          //       // pretty: true,
          //     })
          //   )
          // }
          // return args
          return { [entity]: _.merge({}, ...data) }
        },
      },
      // [S.Atom]: async function (args, mode, state) {},
      // [S.String]: {
      //   evaluate: async (entity, mode, state) => {
      //     return "LALALA"
      //   },
      // },
      // [S.FUNCTION]: {
      //   evaluate: async function (args, mode, state, action) {
      //     console.dir({ action, args })
      //   },
      // },
    },
    // default: {
    //   evaluate: async function (args, mode, state, action) {
    //     console.dir({ action, args })
    //   },
    // },
    evaluate: async function (values, mode, state) {
      // return _.merge({}, ...values)
      return values
    },
  })
  // console.dir(output)
  console.log(
    "Output : " +
      colorize(output, {
        pretty: true,
      })
  )

  t.pass()
})

*/
