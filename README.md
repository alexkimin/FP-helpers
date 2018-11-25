# my_utilities

Utility helper functions that I used when the project doesn't have lodash, ramda or recompose.

### Why?

* The functions are point-free and curried, so easy to use for composed operations.
* The functions provides more polymorphism, can be used for more data types (e.g. works for object and iterables).

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