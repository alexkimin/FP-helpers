# FP-helpers

This repo is personal implementations and unit testings of functional programming style functions for studying purpose and some note. There are already brilliant libraries like [Lodash](https://lodash.com/) or [Ramda](https://ramdajs.com/). Personally, I highly recommend exploring the functional programming paradigm for your project or for fun.

### Why?

* why not?

### How to use

* Focus on functions, composition, and types.

* Functions are just like Lego blocks, they can be combined and reusable.

* All functions in this repo(or existing libs) are point-free and curried, so easy to use for composition.
  ```javascript
    Building a piped operation or stream.

    const operationA = pipe(
      map(iteratee1),
      filter(iteratee2),
    )

    const operationB = pipe(
      ifElse(predicate, onTrue, onFalse),
      reduce(iteratee3)
    )

    const whatIWillDo = pipe(
      operationA,
      operationB
    )

    whatIWillDo(data)
  ```
* The functions accepts more types than default methods.

  ```javascript
    Array.prototype.map(iteratee: Function)
    * Only Array

    map(data: Functor, iteratee: Function)
    * {}, Array, Map, Function, Promise
  ```

## List of functions

* common
  - identity
  - noop
* curry
  - curry
    - reculsive curry, no matter the N of params
  - curryR
    - reversed
  - curryRR
    - reversed, sequence of params also reversed
* application
  - apply
  - call
* composition
  - pipe
    - B-combinator: left to right
  - pipeP
    - pipe with promise
  - pipeA
    - pipe with async/await, same as pipeP
  - compose
    - C-combinator: right to left
  - composeP
    - compose with promise
  - composeA
    - compose with async/await, same as composeP
* map
  - each
  - eachR
  - map
  - filter
  - reduce
  - reduceR
* condition
  - ifElse
  - and
  - or
  - not
  - allTrue
  - anyTrue
* list
  - flatten
* validation
  - isFunction
  - isPromise
  - isIterable