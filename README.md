<h1 align="center">S-Expression in JavaScript</h1>
<p align="center">
  <a href="https://github.com/NLKNguyen/S-Expression.JS/blob/master/LICENSE" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/github/license/NLKNguyen/S-Expression.JS.svg?color=blueviolet" />

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
 
S-Expression Parser, Serializer, and Tree Constructor / Walker Utilities for JavaScript in Browsers and Node.js

Zero-dependencies. Tree structure as plain JSON. Ideal for custom data transfer format and making DSLs.

# ⭐ Overview

<p>S-Expression is surprisingly a powerful and very simple concept to represent both data and function with minimalist syntax. It was popularized by LISP (a classic programming language that was used heavily in AI research) in the very beginning of computer science, circa 1960, and yet S-Expression is still one of the best ideas around due to its simplicity and extensibility. It contains only lists containing symbols and nested lists, and it's totally up to the programmers to make the meanings out of those symbols and their arrangements. S-Expression is a good choice for many use cases ranging from command format, config file format, small domain-specific language to a full-blown programming language.</p>

<p>S-Expression is so minimal that it resembles an abstract syntax tree (AST), which is the underlying representation of many high-level programming languages when their syntactic sugar code is parsed through the typical language grammars. This appeals to many language designers because they can bypass the typical grammar design in forms such as BNF and instead focus on the core syntax tree to accomplish their main goals for the languages, and consequently providing a native/in-language way to manipulate the syntax tree thus enables more dynamic capability and easier metaprogramming.</p>

<p>These are some of the reasons why there are so many popular languages based on S-Expression such as Lisp, Clojure, Scheme, Racket, and their families of languages. More recently, WebAssembly, the 4th language of the Web, also embraces S-Expression for its textual form. Once you're familiar with S-Expression and its flexibility, it becomes useful knowledge in your development toolkit and can come in handy as an obvious choice over any ad-hoc input parsing that often comes up in your career as a developer.</p>

<p>This project makes working with S-Expression in JavaScript really easy.</p>

# 🛠️ Installation

```shell
npm install --save js-sexpr
```

<a href="https://js-sexpr.dephony.com/" title="Read API documentation">
  <img src="https://img.shields.io/badge/API%20Documentation-HTML-blue.svg" alt="API documentation link" height=30/>
</a>
<p></p>
<p></p>

# 🚀 Quick start

TODO: simple parsing example

See API documentation for more reference.

# 👋 Author

<!-- ### 🏠🏗️ [Homepage](https://github.com/NLKNguyen/papercolor-theme) -->

👤 **Nikyle Nguyen**

  <a href="https://twitter.com/NLKNguyen" target="_blank">
    <img alt="Twitter: NLKNguyen" src="https://img.shields.io/twitter/follow/NLKNguyen.svg?style=social" />
  </a>

-   Website: <https://dephony.com/Nikyle>
-   Twitter: [@NLKNguyen](https://twitter.com/NLKNguyen)
-   Github: [@NLKNguyen](https://github.com/NLKNguyen)
-   LinkedIn: [@NLKNguyen](https://linkedin.com/in/NLKNguyen)

# 🤝 Contributing

Give a ⭐️ if this project helped you working with S-Expression easily in JavaScript!

Contributions, issues and feature requests are welcome! Feel free to check [issues page](https://github.com/NLKNguyen/S-Expression.JS/issues).

## 🙇 Your support is very much appreciated

I create open-source projects on GitHub and continue to develop/maintain as they are helping others. You can integrate and use these projects in your applications for free! You are free to modify and redistribute anyway you like, even in commercial products.

I try to respond to users' feedback and feature requests as much as possible. Obviously, this takes a lot of time and efforts (speaking of mental context-switching between different projects and daily work). Therefore, if these projects help you in your work, and you want to encourage me to continue create, here are a few ways you can support me:

-   💬 Following my blog and social profiles listed above to help me connect with your network
-   ⭐️ Starring this project and sharing with others as more users come, more great ideas arrive!
-   ☘️ Donating any amount is a great way to help me work on the projects more regularly!

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

The project is [Unlicense License](https://github.com/NLKNguyen/S-Expression.JS/blob/master/LICENSE)

It is "a license with no conditions whatsoever which dedicates works to the public domain. Unlicensed works, modifications, and larger works may be distributed under different terms and without source code." This simply means that the project is free to use in any capacity without any warranty while reserving the rights for others to also freely do anything with it.

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [SExpr](#sexpr)
    -   [Parameters](#parameters)
    -   [context](#context)
    -   [stripComments](#stripcomments)
        -   [Parameters](#parameters-1)
    -   [parse](#parse)
        -   [Parameters](#parameters-2)
    -   [serialize](#serialize)
        -   [Parameters](#parameters-3)
    -   [identifier](#identifier)
        -   [Parameters](#parameters-4)
        -   [Examples](#examples)
    -   [isAtom](#isatom)
        -   [Parameters](#parameters-5)
        -   [Examples](#examples-1)
    -   [isEqual](#isequal)
        -   [Parameters](#parameters-6)
    -   [expression](#expression)
        -   [Parameters](#parameters-7)
    -   [isExpression](#isexpression)
        -   [Parameters](#parameters-8)
    -   [boolean](#boolean)
        -   [Parameters](#parameters-9)
    -   [isBoolean](#isboolean)
        -   [Parameters](#parameters-10)
    -   [isTruthy](#istruthy)
        -   [Parameters](#parameters-11)
    -   [isMissing](#ismissing)
        -   [Parameters](#parameters-12)
    -   [null](#null)
    -   [isNull](#isnull)
        -   [Parameters](#parameters-13)
    -   [number](#number)
        -   [Parameters](#parameters-14)
    -   [isNumber](#isnumber)
        -   [Parameters](#parameters-15)
    -   [string](#string)
        -   [Parameters](#parameters-16)
    -   [isString](#isstring)
        -   [Parameters](#parameters-17)
    -   [valueOf](#valueof)
        -   [Parameters](#parameters-18)
    -   [first](#first)
        -   [Parameters](#parameters-19)
    -   [second](#second)
        -   [Parameters](#parameters-20)
    -   [third](#third)
        -   [Parameters](#parameters-21)
    -   [fourth](#fourth)
        -   [Parameters](#parameters-22)
    -   [fifth](#fifth)
        -   [Parameters](#parameters-23)
    -   [sixth](#sixth)
        -   [Parameters](#parameters-24)
    -   [seventh](#seventh)
        -   [Parameters](#parameters-25)
    -   [eighth](#eighth)
        -   [Parameters](#parameters-26)
    -   [ninth](#ninth)
        -   [Parameters](#parameters-27)
    -   [tenth](#tenth)
        -   [Parameters](#parameters-28)
    -   [nth](#nth)
        -   [Parameters](#parameters-29)
    -   [rest](#rest)
        -   [Parameters](#parameters-30)
    -   [interpret](#interpret)
        -   [Parameters](#parameters-31)

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

### Parameters

-   `options` **any**  (optional, default `{}`)

### context

Public field for programmers to store arbitrary data that might be useful
for parsing expressions

### stripComments

strip comments from code in according to the lineCommentPrefixes setting

#### Parameters

-   `str` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** code which might have line comments

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** code without comments

### parse

Parse a S-expression string into a JSON object representing an expression
tree

#### Parameters

-   `str` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** S-expression string

Returns **[json](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/JSON)** an expression tree in form of list that can include nested
lists similar to the structure of the input S-expression

### serialize

Serialize an expression tree into an S-expression string

#### Parameters

-   `E` **any** 

Returns **any** 

### identifier

Create an identifier symbol

#### Parameters

-   `id` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

#### Examples

```javascript
const S = new SExpr()
const node = S.expression(S.identifier('a'))
// ['a']
```

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** symbol

### isAtom

Check if a node is an identifier, optionally compare to a given name

#### Parameters

-   `e` **any** a node to check
-   `id` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** optional id name to compare to (optional, default `undefined`)

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

### isEqual

Compare whether 2 nodes are identical

#### Parameters

-   `a` **any** a node
-   `b` **any** another node to compare to

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if they are the same

### expression

Create an expression node

#### Parameters

-   `exps` **rest** optional initialization list of elements

Returns **[json](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/JSON)** a tree node

### isExpression

Check if a node is an expression, and optionally compare to a given
expression

#### Parameters

-   `e` **any** a node to check whether it's an expression
-   `s` **[json](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/JSON)** optional expression to compare to (optional, default `undefined`)

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if it's an expression (and equals the compared
expression if provided)

### boolean

Create a boolean node with given state

#### Parameters

-   `v` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** boolean value

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** a node with name corresponding to a boolean value

### isBoolean

Check if a node is a boolean value, optionally compare to a given state

#### Parameters

-   `e` **any** a node to check whether it's a boolean
-   `b` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** optional state to compare to (optional, default `undefined`)

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if it's a boolean (and equals the given state if
provided)

### isTruthy

Check if a node is considered truthy. Anything but an explicit false value
is truthy.

#### Parameters

-   `e` **any** a node to check if it's truthy

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if it's truthy

### isMissing

Check if a node doesn't exist, a.k.a undefined

#### Parameters

-   `e` **any** a node to check if it doesn't exist

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if it doesn't exist (undefined)

### null

Create a null node.

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** a node with name representing null value

### isNull

Check if a node is null.

#### Parameters

-   `e` **any** a node to check if it's null

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if it's null

### number

Create a number node

#### Parameters

-   `n` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** value of the new node

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** a node with number value

### isNumber

Check if a node is a number

#### Parameters

-   `e` **any** a node to check if it's a number, optionally compare to a given value
-   `n` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** an optional value to compare to (optional, default `undefined`)

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if it's a number (and equals the given value if provided)

### string

Create a string node.

#### Parameters

-   `str` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** string value of the node

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** a node with string value

### isString

Check if a node is a string, optionally compare to a given string.

#### Parameters

-   `e` **any** a node to check if it's a string
-   `s` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** optional string to compare to (optional, default `undefined`)

Returns **any** true if it's a string (and equals the given string if provided)

### valueOf

Get a value content of a symbol (not expression).

#### Parameters

-   `e` **any** a node to extract value

Returns **any** value

### first

Get the 1st child of a node.

#### Parameters

-   `e` **any** a node to get its child

Returns **any** a child node if exists

### second

Get the 2nd child of a node.

#### Parameters

-   `e` **any** a node to get its child

Returns **any** a child node if exists

### third

Get the 3rd child of a node.

#### Parameters

-   `e` **any** a node to get its child

Returns **any** a child node if exists

### fourth

Get the 4th child of a node.

#### Parameters

-   `e` **any** a node to get its child

Returns **any** a child node if exists

### fifth

Get the 5th child of a node.

#### Parameters

-   `e` **any** a node to get its child

Returns **any** a child node if exists

### sixth

Get the 6th child of a node.

#### Parameters

-   `e` **any** a node to get its child

Returns **any** a child node if exists

### seventh

Get the 7th child of a node.

#### Parameters

-   `e` **any** a node to get its child

Returns **any** a child node if exists

### eighth

Get the 8th child of a node.

#### Parameters

-   `e` **any** a node to get its child

Returns **any** a child node if exists

### ninth

Get the 9th child of a node.

#### Parameters

-   `e` **any** a node to get its child

Returns **any** a child node if exists

### tenth

Get the 10th child of a node.

#### Parameters

-   `e` **any** a node to get its child

Returns **any** a child node if exists

### nth

Get the n-th child of a node. Similar to the shorthand `first`, `second`, `third`, `fourth`, `fifth` ... `tenth`, but at any position provided.

#### Parameters

-   `e` **any** a node to get its child
-   `n` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** position of the child node, starting from 1

Returns **any** a child node if exists

### rest

Skip the first child node and get the rest

#### Parameters

-   `e` **any** a node to get its child

Returns **any** the rest of the nodes or undefined if the input node is not an expression

### interpret

interpret a parsed expression tree (AST) into data structures in according
to a method of interpretation. The current available method is using
"functional" notation similar to LISP dialects such as CLIPS, Clojure,
Scheme, Racket, etc.

#### Parameters

-   `expression`  
-   `mode`   (optional, default `null`)
-   `state`   (optional, default `{}`)
-   `E` **any** 

Returns **any** 
