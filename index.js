"use strict"
/**
 * Class of S-Expression resolver that includes parser, serializer, tree
 * constructors, and tree walker utilities.
 *
 * Creates an instance of SExpr. Optional `options` input for configuring
 * default behavior, such as how to recognize null, boolean values as it's up to
 * the programmer to decide the syntax. Nevertheless, here is the default that
 * you can override.
 * ```javascript
 * {
 *  truthy: ['true', '#t'],
 *  falsy: ['false', '#f'],
 *  nully: ['null', '#nil']
 * }
 * ```
 */
class SExpr {
  /**
   * Public field for programmers to store arbitrary data that might be useful
   * for parsing expressions
   * @public
   * @default {}
   */
  context = {}

  truthy = ["true", "#t"]
  falsy = ["false", "#f"]
  nully = ["null", "#nil"]

  lineCommentPrefixes = [";"]

  evaluator = {
    notation: "functional",
    //unwrap_list_with_single_atom: false,
    // atom_as_string: false,
    // right_associations: ["'"],
    // handlers: {
    //   "'": {
    //     notation: null,
    //     transform: (forms) => forms,
    //     apply: (forms) => forms
    //   },
    // },
    // apply: (forms) => forms,
  }
  /**

   *
   * @param {*} [options={}]  
   */
  constructor(options = {}) {
    this.truthy = options.truthy || this.truthy
    this.falsy = options.falsy || this.falsy
    this.nully = options.nully || this.nully
    this.line_comment_prefix =
      options.line_comment_prefix || this.line_comment_prefix
    this.evaluator = options.evaluator || this.evaluator
  }

  stripComments(str) {
    for (let lineCommentPrefix of this.lineCommentPrefixes) {
      // '(;[^"\\n\\r]*(?:"[^"\\n\\r]*"[^"\\n\\r]*)*[\\r\\n])'
      const regex = new RegExp(
        `(${lineCommentPrefix}[^"\\n\\r]*(?:"[^"\\n\\r]*"[^"\\n\\r]*)*[\\r\\n])`,
        "g"
      )
      // console.dir(regex)
      // console.dir(regex.exec(str))
      str = str.replaceAll(regex, "")
      // console.dir(str)
    }
    return str
  }
  /**
   * Parse a S-expression string into a JSON object representing an expression
   * tree
   *
   * @param  {string} str S-expression string
   * @returns {json} an expression tree in form of list that can include nested
   * lists similar to the structure of the input S-expression
   * @ref improved on: https://rosettacode.org/wiki/S-expressions#JavaScript
   */
  parse(str) {
    str = this.stripComments(str + "\n")
    // const t = str.match(/\s*("[^"]*"|\(|\)|"|[^\s()"]+)/g)
    const t = str.match(/\s*("[^"\\]*(?:\\[\s\S][^"\\]*)*"|\(|\)|"|[^\s()"]+)/g)
    // console.log(JSON.stringify(t, null, 4))
    let o, c, i
    for (o, c = 0, i = t.length - 1; i >= 0; i--) {
      let n,
        ti = t[i].trim()
      if (ti == '"') return
      else if (ti == "(") (t[i] = "["), (c += 1)
      else if (ti == ")") (t[i] = "]"), (c -= 1)
      else if ((n = +ti) == ti) t[i] = n
      else
        t[i] =
          "'" +
          ti
            .replaceAll("\r", "\\r")
            .replaceAll("\n", "\\n")
            .replaceAll("'", "\\'") +
          "'"
      if (i > 0 && ti != "]" && t[i - 1].trim() != "(") t.splice(i, 0, ",")
      if (!c)
        if (!o) o = true
        else return
    }
    return c ? undefined : eval(t.join(""))
  }

  /**
   * Serialize an expression tree into an S-expression string
   *
   * @param {*} E
   * @return {*}
   */
  serialize(E) {
    let s = ""
    for (let i = 0, e = E.length; i < e; i++) s += (s ? " " : "") + E[i]
    return "(" + s + ")"
  }

  /**
   * Create an identifier symbol
   * @example
   * const S = new SExpr()
   * const node = S.expression(S.identifier('a'))
   * // ['a']
   * @param {string} id
   * @return {string} symbol
   */
  identifier(id) {
    return id
  }

  /**
   * Check if a node is an identifier, optionally compare to a given name
   * @example
   * const S = new SExpr()
   * const node = S.expression(S.identifier('a'))
   * console.log(S.isAtom(S.first(node)))
   * // true
   * console.log(S.isAtom(S.first(node, 'a')))
   * // true
   * @param {any} e a node to check
   * @param {string} [id=undefined] optional id name to compare to
   * @return {boolean} true if it is an identifier
   */
  isAtom(e, id = undefined) {
    const isId =
      e &&
      !this.isExpression(e) &&
      !this.isNumber(e) &&
      !this.isString(e) &&
      !this.isBoolean(e)

    if (id) {
      return isId && e === id
    }
    return isId
  }

  // isEqual (a, b) {
  //   return deepEqual(a, b, { strict: true })
  // }

  /**
   * Compare whether 2 nodes are identical
   *
   * @param {any} a a node
   * @param {any} b another node to compare to
   * @return {boolean} true if they are the same
   */
  isEqual(a, b) {
    const aArray = Array.isArray(a)
    const bArray = Array.isArray(b)
    if (aArray != bArray) {
      return false
    }

    if (!aArray) {
      return a === b
    }

    if (a.length != b.length) {
      return false
    }

    for (let i in a) {
      if (!this.isEqual(a[i], b[i])) {
        return false
      }
    }
    return true
  }

  /**
   * Create an expression node
   *
   * @param {rest} exps optional initialization list of elements
   * @return {json} a tree node
   */
  expression(...exps) {
    if (exps) {
      return [...exps]
    }
    return []
  }

  /**
   * Check if a node is an expression, and optionally compare to a given
   * expression
   *
   * @param {any} e a node to check whether it's an expression
   * @param {json} [s=undefined] optional expression to compare to
   * @return {boolean} true if it's an expression (and equals the compared
   * expression if provided)
   */
  isExpression(e, s = undefined) {
    const isExpr = Array.isArray(e)

    if (s) {
      return isExpr && isEqual(e, s)
    }
    return isExpr
  }

  /**
   * Create a boolean node with given state
   *
   * @param {boolean} v boolean value
   * @return {string} a node with name corresponding to a boolean value
   */
  boolean(v) {
    if (v) {
      return `${this.truthy[0]}`
    } else {
      return `${this.falsy[0]}`
    }
  }

  /**
   * Check if a node is a boolean value, optionally compare to a given state
   *
   * @param {any} e a node to check whether it's a boolean
   * @param {boolean} [b=undefined] optional state to compare to
   * @return {boolean} true if it's a boolean (and equals the given state if
   * provided)
   */
  isBoolean(e, b = undefined) {
    if (typeof e === "string" || e instanceof String) {
      for (let t of this.truthy) {
        if (e === t) {
          if (b != undefined) {
            return b == true
          }
          return true
        }
      }
      for (let f of this.falsy) {
        if (e === f) {
          if (b != undefined) {
            return b == false
          }
          return true
        }
      }
    }
    return false
  }

  /**
   * Check if a node is considered truthy. Anything but an explicit false value
   * is truthy.
   *
   * @param {any} e a node to check if it's truthy
   * @return {boolean} true if it's truthy
   */
  isTruthy(e) {
    if (typeof e == "string" || e instanceof String) {
      for (let f of this.falsy) {
        if (e === f) {
          return false
        }
      }
    }
    return true
  }

  /**
   * Check if a node doesn't exist, a.k.a undefined
   * @param {any} e a node to check if it doesn't exist
   * @returns  {boolean} true if it doesn't exist (undefined)
   */
  isMissing(e) {
    return e === undefined
  }

  /**
   * Create a null node.
   *
   * @return {string} a node with name representing null value
   */
  null() {
    return `${this.nully[0]}`
  }

  /**
   * Check if a node is null.
   *
   * @param {any} e a node to check if it's null
   * @return {boolean}  true if it's null
   */
  isNull(e) {
    if (typeof e == "string" || e instanceof String) {
      for (let n of this.nully) {
        if (e === n) {
          return true
        }
      }
    }
    return false
  }

  /**
   * Create a number node
   *
   * @param {number} n value of the new node
   * @return {number} a node with number value
   */
  number(n) {
    return n
  }

  /**
   * Check if a node is a number
   *
   * @param {any} e a node to check if it's a number, optionally compare to a given value
   * @param {number} [n=undefined]  an optional value to compare to
   * @return {boolean} true if it's a number (and equals the given value if provided)
   */
  isNumber(e, n) {
    const isNum = typeof e === "number" || e instanceof Number
    if (n != undefined) {
      return isNum && isEqual(e, n)
    }
    return isNum
  }

  /**
   * Create a string node.
   *
   * @param {string} str string value of the node
   * @return {string} a node with string value
   */
  string(str) {
    return `"${str}"`
  }

  /**
   * Check if a node is a string, optionally compare to a given string.
   *
   * @param {any} e a node to check if it's a string
   * @param {string} [s=undefined] optional string to compare to
   * @return {*} true if it's a string (and equals the given string if provided)
   */
  isString(e, s) {
    const isStr = (typeof e === "string" || e instanceof String) && e[0] === '"'
    if (s != undefined) {
      return isStr && isEqual(e, s)
    }
    return isStr
  }

  /**
   * Get a value content of a symbol (not expression).
   *
   * @param {any} e a node to extract value
   * @return {any} value
   */
  valueOf(e) {
    if (typeof e === "string" || e instanceof String) {
      // maybe quoted string
      if (e[0] === '"') {
        return e.slice(1, e.length - 1)
      }

      // maybe null
      for (let n of this.nully) {
        if (e === n) {
          return null
        }
      }

      // maybe boolean
      for (let t of this.truthy) {
        if (e === t) {
          return true
        }
      }
      for (let f of this.falsy) {
        if (e === f) {
          return false
        }
      }
    }

    // maybe number or identifier
    return e
  }

  /**
   * Get the 1st child of a node.
   *
   * @param {any} e a node to get its child
   * @return {any} a child node if exists
   */
  first(e) {
    if (Array.isArray(e)) {
      return e[0]
    }
    return undefined
  }

  /**
   * Get the 2nd child of a node.
   *
   * @param {any} e a node to get its child
   * @return {any} a child node if exists
   */
  second(e) {
    if (Array.isArray(e)) {
      return e[1]
    }
    return undefined
  }

  /**
   * Get the 3rd child of a node.
   *
   * @param {any} e a node to get its child
   * @return {any} a child node if exists
   */
  third(e) {
    if (Array.isArray(e)) {
      return e[2]
    }
    return undefined
  }

  /**
   * Get the 4th child of a node.
   *
   * @param {any} e a node to get its child
   * @return {any} a child node if exists
   */
  fourth(e) {
    if (Array.isArray(e)) {
      return e[3]
    }
    return undefined
  }

  /**
   * Get the 5th child of a node.
   *
   * @param {any} e a node to get its child
   * @return {any} a child node if exists
   */
  fifth(e) {
    if (Array.isArray(e)) {
      return e[4]
    }
    return undefined
  }

  /**
   * Get the 6th child of a node.
   *
   * @param {any} e a node to get its child
   * @return {any} a child node if exists
   */
  sixth(e) {
    if (Array.isArray(e)) {
      return e[5]
    }
    return undefined
  }

  /**
   * Get the 7th child of a node.
   *
   * @param {any} e a node to get its child
   * @return {any} a child node if exists
   */
  seventh(e) {
    if (Array.isArray(e)) {
      return e[6]
    }
    return undefined
  }

  /**
   * Get the 8th child of a node.
   *
   * @param {any} e a node to get its child
   * @return {any} a child node if exists
   */
  eighth(e) {
    if (Array.isArray(e)) {
      return e[7]
    }
    return undefined
  }

  /**
   * Get the 9th child of a node.
   *
   * @param {any} e a node to get its child
   * @return {any} a child node if exists
   */
  ninth(e) {
    if (Array.isArray(e)) {
      return e[8]
    }
    return undefined
  }

  /**
   * Get the 10th child of a node.
   *
   * @param {any} e a node to get its child
   * @return {any} a child node if exists
   */
  tenth(e) {
    if (Array.isArray(e)) {
      return e[9]
    }
    return undefined
  }

  /**
   * Get the n-th child of a node. Similar to the shorthand `first`, `second`, `third`, `fourth`, `fifth` ... `tenth`, but at any position provided.
   *
   * @param {any} e a node to get its child
   * @param {number} n position of the child node, starting from 1
   * @return {any} a child node if exists
   */
  nth(e, n) {
    if (Array.isArray(e)) {
      return e[n - 1]
    }
    return undefined
  }

  /**
   * Skip the first child node and get the rest
   *
   * @param {any} e a node to get its child
   * @return {any} the rest of the nodes or undefined if the input node is not an expression
   */
  rest(e) {
    if (this.isExpression(e)) {
      return e.slice(1)
    }
    return undefined
  }

  /**
   * interpret a parsed expression tree (AST) into data structures in according
   * to a method of interpretation. The current available method is using
   * "functional" notation similar to LISP dialects such as CLIPS, Clojure,
   * Scheme, Racket, etc.
   *
   * @param {*} E
   * @return {*}
   */

  interpret(expression, mode = null, state = {}) {
    mode = mode || this.evaluator

    if (mode.notation === null) {
      return expression
    }

    if (mode.notation === "functional") {
      const result = []
      for (let form of expression) {
        if (this.isExpression(form)) {
          const head = this.first(form)
          if (this.isMissing(head)) {
            result.push({ "": [] })
          } else {
            const rest = this.rest(form)
            result.push({ [head]: this.interpret(rest, mode, state) })
          }
        } else if (this.isAtom(form)) {
          result.push({ [form]: form }) // atom
        } else {
          result.push(this.valueOf(form)) // normal form / self evaluated, e.g. string, number, boolean
        }
      }
      return result
    }
    throw new Error("unsupported notation: " + mode.notation)
  }
}

module.exports = SExpr
