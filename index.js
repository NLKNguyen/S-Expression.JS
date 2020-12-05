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
    return id
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

  expression (...exps) {
    if (exps) {
      return [...exps]
    }
    return []
  }

  isExpression (e, s = undefined) {
    const isExpr = Array.isArray(e)

    if (s) {
      return isExpr && isEqual(e, s)
    }
    return isExpr
  }

  boolean (v) {
    if (v) {
      return `${this.truthy[0]}`
    } else {
      return `${this.falsy[0]}`
    }
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
  
  null () {
    return `${this.nully[0]}`
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

  number (n) {
    return n
  }

  isNumber (e, n) {    
    const isNum = typeof e === 'number' || e instanceof Number
    if (n != undefined) {
      return isNum && isEqual(e, n)
    }
    return isNum    
  }

  string (str) {
    return `"${str}"`
  }

  isString (e, s) {
    const isStr = (typeof e === 'string' || e instanceof String) && e[0] === '"'
    if (s != undefined) {
      return isStr && isEqual(e, s)
    }
    return isStr    
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

  fourth (e) {
    if (Array.isArray(e)) {
      return e[3]
    }
    return undefined
  }

  fifth (e) {
    if (Array.isArray(e)) {
      return e[4]
    }
    return undefined
  }

  sixth (e) {
    if (Array.isArray(e)) {
      return e[5]
    }
    return undefined
  }

  seventh (e) {
    if (Array.isArray(e)) {
      return e[6]
    }
    return undefined
  }

  eighth (e) {
    if (Array.isArray(e)) {
      return e[7]
    }
    return undefined
  }

  ninth (e) {
    if (Array.isArray(e)) {
      return e[8]
    }
    return undefined
  }

  tenth (e) {
    if (Array.isArray(e)) {
      return e[9]
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

module.exports = SExpr
