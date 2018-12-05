# FP-helpers

![Coverage badge gree][coverage-badge-green]
[coverage-badge-green]: ./coverage/badge-functions.svg

This repo is personal implementations and unit testings of functional programming style functions for studying purpose and some note. There are already brilliant libraries like [Lodash](https://lodash.com/) or [Ramda](https://ramdajs.com/). Personally, I highly recommend exploring the functional programming paradigm for your project or for fun.

### Why?

* why not?

### How to use

* Focus on functions, composition, and types.

* Functions are just like Lego blocks, they can be composed and reusable. The major interest of functional programming is achieving high-level abstraction code through composing small and small functions.

* All functions in this repo(or existing libs) are point-free and curried, so easy to use for composition.
  ```javascript
    Building a piped operation or stream.

    const filterAvaliableMenu = pipe(
      map(iteratee),
      filter(iteratee)
    )

    const getMyFavorite = pipe(
      ifElse(predicate, onTrue, onFalse),
      reduce(iteratee)
    )

    const selectDinnerOfToday = pipe(
      filterAvaliableMenu,
      getMyFavorite
    )

    selectDinnerOfToday(options)
  ```
* The functions accepts more types than default methods, can do more things.

  ```javascript
  * Only Array

    Array.prototype.map(iteratee: Function)

  * {}, Array, Map, Function, Promise

    map(data: Functor, iteratee: Function)
  ```

## List of functions

under construction...
