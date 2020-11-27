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

  expression () { // TODO: take vargs
    return []
  }

  isIdentifier (e) {
    return (
      e &&
      !this.isExpression(e) &&
      !this.isNumber(e) &&
      !this.isString(e) &&
      !this.isBoolean(e)
    )
  }

  isExpression (e) {
    return Array.isArray(e)
  }

  isBoolean (e) {
    if (typeof e == 'string') {
      for (let t of this.truthy) {
        if (e === t) {
          return true
        }
      }
      for (let f of this.falsy) {
        if (e === f) {
          return true
        }
      }
    }
    return false
  }

  isTruthy (e) {
    if (typeof e == 'string') {
      for (let f of this.falsy) {
        if (e === f) {
          return false
        }
      }
    }
    return true
  }

  isNull (e) {
    if (typeof e == 'string') {
      for (let n of this.nully) {
        if (e === n) {
          return true
        }
      }
    }
    return false
  }

  isNumber (e) {
    return typeof e === 'number'
  }

  isString (e) {
    return typeof e === 'string' && e[0] === '"'
  }

  content (e) {
    return e.slice(1, a.length - 1)
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

  nth (e, n) {
    if (Array.isArray(e)) {
      return e[n - 1]
    }
    return undefined
  }
}

// const S = new SExpr()

// const node = S.expression()
// node.push(S.identifier('add'), S.number(5), S.expression( S.identifier('event'), S.string('CASE')))) )
// console.log(S.null())
// console.log(S.boolean(true))
// console.log(S.parse("(a-b true () '('1 2' . 3))"))
module.exports = SExpr
