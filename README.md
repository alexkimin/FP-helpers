# my_utilities

Utility helper functions that I used when the project doesn't have underscore, lodash, ramda or recompose.

### Why?

* The functions are point-free and curried, so easy to be used for composed operations.
  ```javascript
    map(data, iteratee)

    pipe(
      map(iteratee1),
      map(iteratee2),
      ifElse(predicate, onTrue, onFalse),
      ... and more
    )(data)
  ```
* The functions provides more polymorphism, can be used for more data types.
  ```javascript
    map(data: Object | Iterables | ArrayLike, iteratee: Function)
  ```
* personal practice

## List of functions

* common
  - identity
  - nothing
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
  - map
  - filter
  - reduce
  - reduceRight
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