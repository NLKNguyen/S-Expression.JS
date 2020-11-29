'use strict'
class SExpr {
  truthy = ['true', '#t']
  falsy = ['false', '#f']
  nully = ['null', '#nil']

  constructor (options = {}) {
    this.truthy = options.truthy || this.truthy
    this.falsy = options.falsy || this.falsy
    this.nully = options.nully || this.nully
  }

  // @ref credit: https://rosettacode.org/wiki/S-expressions#JavaScript
  parse (str) {
    const t = str.match(/\s*("[^"]*"|\(|\)|"|[^\s()"]+)/g)
    let o, c, i
    for (o, c = 0, i = t.length - 1; i >= 0; i--) {
      let n,
        ti = t[i].trim()
      if (ti == '"') return
      else if (ti == '(') (t[i] = '['), (c += 1)
      else if (ti == ')') (t[i] = ']'), (c -= 1)
      else if ((n = +ti) == ti) t[i] = n
      else t[i] = "'" + ti.replace("'", "\\'") + "'"
      if (i > 0 && ti != ']' && t[i - 1].trim() != '(') t.splice(i, 0, ',')
      if (!c)
        if (!o) o = true
        else return
    }
    return c ? undefined : eval(t.join(''))
  }

  serialize (L) {
    let s = ''
    for (let i = 0, e = L.length; i < e; i++) s += (s ? ' ' : '') + L[i]
    return '(' + s + ')'
  }

  identifier (id) {
    return String(id)
  }

  number (v) {
    return Number(v)
  }

  null () {
    return `${this.nully[0]}`
  }

  string (str) {
    return `"${str}"`
  }

  boolean (v) {
    if (v) {
      return `${this.truthy[0]}`
    } else {
      return `${this.falsy[0]}`
    }
  }

  expression (...exps) {
    if (exps) {
      return [...exps]
    }
    return []
  }

  isIdentifier (e, id = undefined) {
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

  isEqual (a, b) {
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

  isExpression (e, s = undefined) {
    const isExpr = Array.isArray(e)

    if (s) {
      return isExpr && isEqual(e, s)
    }
    return isExpr
  }

  isBoolean (e, b = undefined) {
    if (typeof e === 'string' || e instanceof String) {
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

  isTruthy (e) {
    if (typeof e == 'string' || e instanceof String) {
      for (let f of this.falsy) {
        if (e === f) {
          return false
        }
      }
    }
    return true
  }

  isNull (e) {
    if (typeof e == 'string' || e instanceof String) {
      for (let n of this.nully) {
        if (e === n) {
          return true
        }
      }
    }
    return false
  }

  isNumber (e) {
    return typeof e === 'number' || e instanceof Number
  }

  isString (e) {
    return (typeof e === 'string' || e instanceof String) && e[0] === '"'
  }

  valueOf (e) {
    if (typeof e === 'string' || e instanceof String) {
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

  first (e) {
    if (Array.isArray(e)) {
      return e[0]
    }
    return undefined
  }

  second (e) {
    if (Array.isArray(e)) {
      return e[1]
    }
    return undefined
  }

  third (e) {
    if (Array.isArray(e)) {
      return e[2]
    }
    return undefined
  }

  // TODO: 4th -> 10th

  nth (e, n) {
    if (Array.isArray(e)) {
      return e[n - 1]
    }
    return undefined
  }
}

const S = new SExpr()

const node = S.expression()
node.push(
  S.identifier('repeat'),
  S.number(3),
  S.expression(S.identifier('print'), S.string('Knock'))
)

const parsed = S.parse(`(repeat 3 (print "Knock"))`)

console.assert(S.isEqual(node, parsed))

console.log(node)

// same as S.isIdentifier(node[0]) && node[0] === 'repeat'
if (S.isIdentifier(S.first(node), 'repeat')) {  
  if (S.isNumber(S.second(node))) {
    const n = S.second(node) // same as node[1] or S.nth(node, 2)
    const e = S.third(node) // same as node[2] or S.nth(node, 3)
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

module.exports = SExpr
