<h1 align="center">S-Expression in JavaScript — DSL Maker's Toolkit</h1>
<p align="center">
  <a href="https://github.com/NLKNguyen/S-Expression.JS/blob/master/LICENSE" target="_blank">
    <img alt="License: Unlicense" src="https://img.shields.io/github/license/NLKNguyen/S-Expression.JS.svg?color=blueviolet" />

  </a>

  <a href="https://github.com/NLKNguyen/S-Expression.JS/issues" target="_blank">
    <img alt="Closed issues" src="https://img.shields.io/github/issues-closed-raw/NLKNguyen/S-Expression.JS.svg?color=yellow" />
  </a>

  <a href="https://www.patreon.com/Nikyle" title="Donate to this project using Patreon">
    <img src="https://img.shields.io/badge/support%20me-patreon-red.svg" alt="Patreon donate button" />
  </a>

  <a href="https://paypal.me/NLKNguyen" title="Donate one time via PayPal">
    <img src="https://img.shields.io/badge/paypal-me-blue.svg" alt="PayPal donate button" />
  </a>

  <a href="https://www.amazon.com/gp/registry/wishlist/3E0E6ZS7RQ5GS/" title="Send a gift through my Amazon wishlist">
    <img src="https://img.shields.io/badge/send%20a%20gift-amazon-darkorange.svg" alt="Amazon donate button" />
  </a>
</p>

<p align="center">
  <a href="https://www.buymeacoffee.com/Nikyle" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height=45 />
  </a>
</p>

S-Expression Parser, Serializer, Interpreter, and Tree Constructor / Walker Utilities in plain JavaScript for browsers and Node.js with <u>zero dependencies</u>.

**Feature Highlights**

*   Parse S-Expression string to Abstract Syntax Tree (AST)
    *   AST data structure is JSON (ideal for program/data transfer or
        interpretation).

*   Construct and traverse AST using helper methods

*   Serialize AST to S-Expression string

*   Support LISP-like comment syntax: line comment prefix `;` and block comment
    guards `#|`, `|#`
    *   Comments are stripped in the parsing process and therefore not included
        in AST.

*   Support JSON-compatible value types: `boolean`, `number`, `null`, and
    `string` with multi-line support and escaped quotation `\"`

*   Interpret AST as LISP-like functional notation (a.k.a Cambridge Polish
    Notation), convenient for making Domain Specific Languages (DSLs) that have
    similar syntax to LISP dialects (CLIPS, Clojure, Scheme, Racket, etc.).

    *   Define your custom handlers in JS to evaluate expressions in a similar
        concept like in YACC/Bison or ANTLR but without the out-of-source file
        for code generation. With S-Expression.js, the minimum grammar is
        presumed to be LISP-like, so the parsing is taken care of, and all you
        just need to do is to define the expression evaluators which can be done
        all in-source.

    *   The default transformed format is also JSON, so if you like, you can
        defer to another language for the evaluation part. Since this library is
        self-contained, and because JavaScript is widely supported, you can
        easily interop it with a sandbox in your application such that you
        retrieve just the JSON output to evaluate using features available in
        your host language.

    *   JSON `array` and `object` types are used to represent function forms.

**TL;DR**: jump to [Quick Start](#-quick-start) and hack away

# ⭐ Background

<p>S-Expression is surprisingly a powerful and very simple concept to represent both data and function with minimalist syntax. It was popularized by LISP (a classic programming language that was used heavily in AI research) at the very beginning of computer science, circa 1960, and yet S-Expression is still one of the best ideas around due to its simplicity and extensibility. It contains only lists containing symbols and nested lists, and it's totally up to the programmers to make the meanings out of those symbols and their arrangements. S-Expression is a good choice for many use cases ranging from command format, config file format, small domain-specific language, or full-blown programming language.</p>

<p>S-Expression is so minimal that it resembles an abstract syntax tree (AST), which is the underlying representation of many high-level programming languages when their syntactic sugar code is parsed through the typical language grammars. This appeals to many language designers because they can bypass the typical grammar design in forms such as BNF and instead focus on the core syntax tree to accomplish their main goals for the languages, consequently providing a native/in-language way to manipulate the syntax tree thus enables more dynamic capability and easier meta-programming.</p>

<p>These are some of the reasons why there are so many popular languages based on S-Expression such as Lisp, Clojure, Scheme, Racket, and their families of languages. More recently, WebAssembly, the 4th language of the Web, also embraces S-Expression for its textual form. Once you're familiar with S-Expression and its flexibility, it becomes useful knowledge in your development toolkit and can come in handy as an obvious choice over any ad-hoc input parsing that often comes up in your career as a developer.</p>

<p>This project makes working with S-Expression in JavaScript easy, and the author's intention is to make this library a toolkit for creating domain-specific languages that boost productivity and help simplify the coding interface for less technical users.</p>

# 💡 Why make domain-specific languages?

All usual reasons for DSLs apply. Here are just a few use cases:

*   Custom data format that is more compact and easier to write than the target
    format schema

*   Custom command format for system interaction or utility (e.g. REPL shell, chat bot command, etc.)

*   Abstract away low-level/repetitive JS code so that developers/users can write
    in a high-level language for the business logic / query.

*   Allow clients to send a remote procedure in a safe DSL so that the server can
    interpret just what is allowed.

*   Alternative to adding programming logic to a dumb data format like
    JSON/YAML/XML when it started as a quick workaround at first, but then the
    logic grows.

# 🛠️ Installation

**Option 1: install latest release on NPM to your Node.js project**

```shell
npm install --save s-expression.js
```

**Option 2: install from this repository source code**

```shell
git clone https://github.com/NLKNguyen/S-Expression.JS

cd S-Expression.JS

# make it globally available on your machine; to undo: npm unlink
npm link

# then from your own project directory, make a link to this library; similarly to undo: npm unlink s-expression.js
npm link s-expression.js

# you can now require it in your JS source just like normal, e.g. const SExpr = require("s-expression.js")
```

# 🧪 Test

Run all test cases

```shell
npm run test
```

Run a specific set of test cases

```shell
npx tape ./tests/parse.js | npx tap-spec

npx tape ./tests/interpret.js | npx tap-spec

npx tape ./tests/helpers.js | npx tap-spec
```

Piping to `tap-spec` is optional, but it makes the output easier to read.

<!-- 
# Publish

```shell
npm publish --access public
```
-->

# 🚀 Quick start

API documentation is embedded at the bottom for reference.

### `parse(str: string): Array< number | string | Array >`

Turns a raw S-expression string into JSON that represents an abstract syntax tree in which:

*   An expression is parsed as a JSON array
*   A number is parsed as a JSON number
*   A double-quoted string is parsed as a JSON string wrapped with literal double quotations, e.g. `"\"example string\""`
    *   `S.valueOf("\"example string\"")` returns `"example string"` JSON string value
*   A boolean (`true`, `false`, `#t`, `#f`) is parsed as a JSON string of the value, e.g. `"true"`
    *   `S.valueOf("true")` returns `true` JSON boolean value
    *   Tokens that indicate boolean values can be configured
*   A null (`null`, `#nil`) is parsed as a JSON string of the null value, e.g. `"null"`
    *   `S.valueOf("null")` returns `null` JSON value
    *   Tokens that indicate null can be configured
        *   Note: `undefined` is not configured, so it's parsed as a normal atom.
*   Any other token is parsed as a JSON string of the identifier, e.g. `"a"`
    *   `S.valueOf("a")` returns `"a"` JSON string value

If the return is not an array (can check with `S.isExpression`), then it's invalid.

<!-- You can change the defaults of what tokens mean null or boolean value. -->

0.  **Initialize**

```js
const SExpr = require("s-expression.js")
const S = new SExpr()
```

1.  **Simple parsing root S-expression as a list**

```js
S.parse(`(1 2 3)`) // [1, 2, 3]
```

2.  **Simple tree-walk on root expression with mixed value types**

```js
const ast = S.parse(`( 1 "a \\"b\\" c" true null d (e f ()) )`)

if (S.isExpression(ast)) {
    console.log(`ast is an expression: ${JSON.stringify(ast)}`)
} else {    
    throw Error(`ast is not a valid expression`)
}

let index = 0
for (let e of ast) {
  if (S.isNumber(e)) {
        console.log(`ast[${index}] is a number with value: ${S.valueOf(e)}`)
  } else if (S.isString(e)) {
        console.log(`ast[${index}] is a string with value: ${JSON.stringify(S.valueOf(e))}`)
  } else if (S.isBoolean(e)) {
        console.log(`ast[${index}] is a boolean with value: ${S.valueOf(e)}`)
  } else if (S.isNull(e)) {
        console.log(`ast[${index}] is a null with value: ${S.valueOf(e)}`)
  } else if (S.isAtom(e)) {
        console.log(`ast[${index}] is an atom with id: ${S.valueOf(e)}`)
  } else { // S.isExpression(e)
        console.log(`ast[${index}] is an expression: ${JSON.stringify(e)}`)
  }
  index++
}
```

Output:

```clj
ast is an expression: [1,"\"a \"b\" c\"","true","null","d",["e","f",[]]]
ast[0] is a number with value: 1
ast[1] is a string with value: "a \"b\" c"
ast[2] is a boolean with value: true
ast[3] is a null with value: null
ast[4] is an atom with id: d
ast[5] is an expression: ["e","f",[]]
```

See `./tests/parse.js` for more parsing examples

## Serialize

TODO

Please look at the unit tests for use cases in the meantime.

## Interpret

TODO: simple custom DSL example

Please look at the unit tests for use cases in the meantime.

# 👋 Author

👤 **Nikyle Nguyen**

  <a href="https://twitter.com/NLKNguyen" target="_blank">
    <img alt="Twitter: NLKNguyen" src="https://img.shields.io/twitter/follow/NLKNguyen.svg?style=social" />
  </a>

*   Website: <https://dephony.com/Nikyle>
*   Twitter: [@NLKNguyen](https://twitter.com/NLKNguyen)
*   Github: [@NLKNguyen](https://github.com/NLKNguyen)
*   LinkedIn: [@NLKNguyen](https://linkedin.com/in/NLKNguyen)

# 🤝 Contributing

Give a ⭐️ if this project helped you working with S-Expression easily in JavaScript!

Contributions, issues and feature requests are welcome! Feel free to check [issues page](https://github.com/NLKNguyen/S-Expression.JS/issues).

## 🙇 Your support is very much appreciated

I create open-source projects on GitHub and continue to develop/maintain them as they are helping others. You can integrate and use these projects in your applications for free! You are free to modify and redistribute any way you like, even in commercial products.

I try to respond to users' feedback and feature requests as much as possible. This takes a lot of time and effort (speaking of mental context-switching between different projects and daily work). Therefore, if these projects help you in your work, and you want to support me to continue developing, here are a few ways you can support me:

*   💬 Following my blog and social profiles listed above to help me connect with your network
*   ⭐️ Starring this project and sharing with others as more users come, more great ideas arrive!
*   ☘️ Donating any amount is a great way to help me work on the projects more regularly!

<p>

  <a href="https://paypal.me/NLKNguyen" target="_blank">
      <img src="https://user-images.githubusercontent.com/4667129/101101433-71b7ff00-357d-11eb-8cf2-3c529960d422.png" height=44 />
  </a>

  <a href="https://www.patreon.com/Nikyle" target="_blank">
    <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" height=44 style="border-radius: 5px;" />
  </a>

  <a href="https://www.buymeacoffee.com/Nikyle" target="_blank">
      <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height=44 />
  </a>

</p>

# 📝 License

Copyright © 2022 [Nikyle Nguyen](https://github.com/NLKNguyen)

The project is [MIT License](https://github.com/NLKNguyen/code-formation/blob/master/LICENSE).

It is a simple permissive license with conditions only requiring the preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.

<!-- 
This snippet is used to transform the generated API markdown to include a divider
It's idempotent, meaning that it can run multiple times but will not add more 
dividers than necessary.

// $<:AddDivider (LANGUAGE "nodejs")

module.exports = async (context) => {
  const regex = /(?<!---)(\r?\n\r?\n)(###\s)/gm
  /* 
    if matched, (\r?\n\r?\n) => $1
                (###\s) => $2
  */

  return context.INPUT.replaceAll(regex, "$1---$1$2")
}

// $>

The below blob instruction will transform the rest of this file with the snippet
AddDivider to add minimum divider to make it easy to read.
-->

<!-- !API<:TRANSFORM (APPLY (AddDivider)) -->

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

---

### Table of Contents

*   [SExpr](#sexpr)
    *   [Parameters](#parameters)
    *   [interpret](#interpret)
        *   [Parameters](#parameters-1)
    *   [stripComments](#stripcomments)
        *   [Parameters](#parameters-2)
    *   [parse](#parse)
        *   [Parameters](#parameters-3)
    *   [serialize](#serialize)
        *   [Parameters](#parameters-4)
    *   [identifier](#identifier)
        *   [Parameters](#parameters-5)
        *   [Examples](#examples)
    *   [isAtom](#isatom)
        *   [Parameters](#parameters-6)
        *   [Examples](#examples-1)
    *   [isEqual](#isequal)
        *   [Parameters](#parameters-7)
    *   [expression](#expression)
        *   [Parameters](#parameters-8)
    *   [isExpression](#isexpression)
        *   [Parameters](#parameters-9)
    *   [boolean](#boolean)
        *   [Parameters](#parameters-10)
    *   [isBoolean](#isboolean)
        *   [Parameters](#parameters-11)
    *   [isTruthy](#istruthy)
        *   [Parameters](#parameters-12)
    *   [isMissing](#ismissing)
        *   [Parameters](#parameters-13)
    *   [null](#null)
    *   [isNull](#isnull)
        *   [Parameters](#parameters-14)
    *   [number](#number)
        *   [Parameters](#parameters-15)
    *   [isNumber](#isnumber)
        *   [Parameters](#parameters-16)
    *   [string](#string)
        *   [Parameters](#parameters-17)
    *   [isString](#isstring)
        *   [Parameters](#parameters-18)
    *   [valueOf](#valueof)
        *   [Parameters](#parameters-19)
    *   [first](#first)
        *   [Parameters](#parameters-20)
    *   [second](#second)
        *   [Parameters](#parameters-21)
    *   [third](#third)
        *   [Parameters](#parameters-22)
    *   [fourth](#fourth)
        *   [Parameters](#parameters-23)
    *   [fifth](#fifth)
        *   [Parameters](#parameters-24)
    *   [sixth](#sixth)
        *   [Parameters](#parameters-25)
    *   [seventh](#seventh)
        *   [Parameters](#parameters-26)
    *   [eighth](#eighth)
        *   [Parameters](#parameters-27)
    *   [ninth](#ninth)
        *   [Parameters](#parameters-28)
    *   [tenth](#tenth)
        *   [Parameters](#parameters-29)
    *   [nth](#nth)
        *   [Parameters](#parameters-30)
    *   [rest](#rest)
        *   [Parameters](#parameters-31)

## SExpr

Class of S-Expression resolver that includes parser, serializer, tree
constructors, and tree walker utilities.

Creates an instance of SExpr. Optional `options` input for configuring
default behavior, such as how to recognize null, boolean values as it's up to
the programmer to decide the syntax. Nevertheless, here is the default that
you can override.

```javascript
{
 truthy: ['true', '#t'],
 falsy: ['false', '#f'],
 nully: ['null', '#nil']
}
```

---

### Parameters

*   `options` **any**  (optional, default `{}`)

---

### interpret

interpret a parsed expression tree (AST) into data structures in according
to a method of defaultMode. The current available method is using
"functional" notation similar to LISP dialects such as CLIPS, Clojure,
Scheme, Racket, etc.

#### Parameters

*   `expression`  
*   `context`   (optional, default `{}`)
*   `state`   (optional, default `{scoped:[],globals:{}}`)
*   `entity`   (optional, default `this.ROOT`)
*   `E` **any** 

Returns **any** 

---

### stripComments

strip comments from S-expression string

#### Parameters

*   `str` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** code which might have comments

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** code without comments

---

### parse

Parse a S-expression string into a JSON object representing an expression
tree

#### Parameters

*   `str` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** S-expression string
*   `opts` **any** deserializing options (optional, default `{includedRootParentheses:true}`)

Returns **[json](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/JSON)** an expression tree in form of list that can include nested
lists similar to the structure of the input S-expression

---

### serialize

Serialize an expression tree into an S-expression string

#### Parameters

*   `ast` **any** parsed expression (abstract syntax tree)
*   `opts` **any** serializing options (optional, default `{includingRootParentheses:true}`)
*   `level`   (optional, default `0`)

Returns **any** 

---

### identifier

Create an identifier symbol

#### Parameters

*   `id` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

#### Examples

```javascript
const S = new SExpr()
const node = S.expression(S.identifier('a'))
// ['a']
```

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** symbol

---

### isAtom

Check if a node is an identifier, optionally compare to a given name

#### Parameters

*   `e` **any** a node to check
*   `id` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** optional id name to compare to (optional, default `undefined`)

#### Examples

```javascript
const S = new SExpr()
const node = S.expression(S.identifier('a'))
console.log(S.isAtom(S.first(node)))
// true
console.log(S.isAtom(S.first(node, 'a')))
// true
```

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if it is an identifier

---

### isEqual

Compare whether 2 nodes are identical

#### Parameters

*   `a` **any** a node
*   `b` **any** another node to compare to

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if they are the same

---

### expression

Create an expression node

#### Parameters

*   `exps` **rest** optional initialization list of elements

Returns **[json](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/JSON)** a tree node

---

### isExpression

Check if a node is an expression, and optionally compare to a given
expression

#### Parameters

*   `e` **any** a node to check whether it's an expression
*   `s` **[json](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/JSON)** optional expression to compare to (optional, default `undefined`)

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if it's an expression (and equals the compared
expression if provided)

---

### boolean

Create a boolean node with given state

#### Parameters

*   `v` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** boolean value

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** a node with name corresponding to a boolean value

---

### isBoolean

Check if a node is a boolean value, optionally compare to a given state

#### Parameters

*   `e` **any** a node to check whether it's a boolean
*   `b` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** optional state to compare to (optional, default `undefined`)

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if it's a boolean (and equals the given state if
provided)

---

### isTruthy

Check if a node is considered truthy. Anything but an explicit false value
is truthy.

#### Parameters

*   `e` **any** a node to check if it's truthy

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if it's truthy

---

### isMissing

Check if a node doesn't exist, a.k.a undefined

#### Parameters

*   `e` **any** a node to check if it doesn't exist

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if it doesn't exist (undefined)

---

### null

Create a null node.

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** a node with name representing null value

---

### isNull

Check if a node is null.

#### Parameters

*   `e` **any** a node to check if it's null

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if it's null

---

### number

Create a number node

#### Parameters

*   `n` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** value of the new node

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** a node with number value

---

### isNumber

Check if a node is a number

#### Parameters

*   `e` **any** a node to check if it's a number, optionally compare to a given value
*   `n` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** an optional value to compare to (optional, default `undefined`)

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if it's a number (and equals the given value if provided)

---

### string

Create a string node.

#### Parameters

*   `str` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** string value of the node

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** a node with string value

---

### isString

Check if a node is a string, optionally compare to a given string.

#### Parameters

*   `e` **any** a node to check if it's a string
*   `s` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** optional string to compare to (optional, default `undefined`)

Returns **any** true if it's a string (and equals the given string if provided)

---

### valueOf

Get a value content of a symbol (not expression).

#### Parameters

*   `e` **any** a node to extract value

Returns **any** value

---

### first

Get the 1st child of a node.

#### Parameters

*   `e` **any** a node to get its child

Returns **any** a child node if exists

---

### second

Get the 2nd child of a node.

#### Parameters

*   `e` **any** a node to get its child

Returns **any** a child node if exists

---

### third

Get the 3rd child of a node.

#### Parameters

*   `e` **any** a node to get its child

Returns **any** a child node if exists

---

### fourth

Get the 4th child of a node.

#### Parameters

*   `e` **any** a node to get its child

Returns **any** a child node if exists

---

### fifth

Get the 5th child of a node.

#### Parameters

*   `e` **any** a node to get its child

Returns **any** a child node if exists

---

### sixth

Get the 6th child of a node.

#### Parameters

*   `e` **any** a node to get its child

Returns **any** a child node if exists

---

### seventh

Get the 7th child of a node.

#### Parameters

*   `e` **any** a node to get its child

Returns **any** a child node if exists

---

### eighth

Get the 8th child of a node.

#### Parameters

*   `e` **any** a node to get its child

Returns **any** a child node if exists

---

### ninth

Get the 9th child of a node.

#### Parameters

*   `e` **any** a node to get its child

Returns **any** a child node if exists

---

### tenth

Get the 10th child of a node.

#### Parameters

*   `e` **any** a node to get its child

Returns **any** a child node if exists

---

### nth

Get the n-th child of a node. Similar to the shorthand `first`, `second`, `third`, `fourth`, `fifth` ... `tenth`, but at any position provided.

#### Parameters

*   `e` **any** a node to get its child
*   `n` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** position of the child node, starting from 1

Returns **any** a child node if exists

---

### rest

Skip the first child node and get the rest

#### Parameters

*   `e` **any** a node to get its child

Returns **any** the rest of the nodes or undefined if the input node is not an expression