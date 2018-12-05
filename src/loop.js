import { curry2 } from './curry';
import { pipe } from './composition';
import { takeAll } from './take';
import { Iter } from './iter';
import { L } from './lazy';
import {
  isFunctor, isUndefined, isFunction, isArray, isMap, isPromise,
} from './validation';
import { reverse } from './collection';

// each :: Collection c => (a -> ...) -> c a -> c a
// each :: (a -> ...) -> String -> String
export const each = curry2((iteratee, coll) => {
  pipe(L.each(iteratee), takeAll)(coll);
  return coll;
});

// eachR :: Collection c => (a -> ...) -> c a -> c a
// eachR :: (a -> ...) -> String -> String
export const eachR = curry2((iteratee, coll) => each(iteratee, reverse(coll)));

// reduce :: Collection c => ((a, b) -> a) -> a -> c b -> a
// reduce :: ((a, String) -> a) -> a -> String -> a
export const reduce = curry2((iteratee, acc, coll) => {
  const iter = Iter.values(isUndefined(coll) ? acc : coll);
  let reduced = isUndefined(coll) ? iter.next().value : acc;
  for (const value of iter) {
    reduced = iteratee(reduced, value);
  }
  return reduced;
});

// reduceR :: Collection c => ((a, b) -> b) -> b -> c a -> b
// export const reduceR = curry2((iteratee, acc, coll) => {

// });

// map :: Functor f => (a -> b) - f a -> f b
export const map = curry2((iteratee, f) => {
  // Array
  if (isArray(f)) return reduce((a, v) => {
    a.push(iteratee(v));
    return a;
  }, [], f);
  // Function, Promise
  if (isFunction(f)) return (...a) => isPromise(f) ? f.then(...a) : f(...a);
  // Map
  if (isMap(f)) return reduce((m, [k, v]) => {
    m.set(k, iteratee(v));
    return m;
  }, new Map(), f);
  // plain object, !arrayLike, !Set
  if (isFunctor(f)) return reduce((obj, k) => {
    obj[k] = iteratee(f[k]);
    return obj;
  }, {}, Object.keys(f));
});
