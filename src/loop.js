import { curry2 } from './curry';
import { pipe } from './composition';
import { takeAll } from './take';
import { Iter } from './iter';
import { L } from './lazy';
import {
  isUndefined, isFunction, isArray, isMap, isPromise,
  isPlainObject, isArrayLike, isIterable,
} from './validation';
import { reverse } from './collection';

/**
 * base
 */
const _runAll = (fn, iterable, coll) => {
  let cur = iterable.next();
  let idx = 0;
  while (!cur.done) {
    fn(cur.value, idx++, coll);
    cur = iterable.next();
  }
};
const _runAllwithKeys = (fn, iterable, coll) => {
  let cur = iterable.next();
  while (!cur.done) {
    fn(coll[cur.value], cur.value, coll);
    cur = iterable.next();
  }
};

/**
 * reduce :: Collection c => ((a, b) -> a) -> a -> c b -> a
 * reduce :: ((a, String) -> a) -> a -> String -> a
 */
export const reduce = curry2((iteratee, acc, coll) => {
  const iter = Iter.values(isUndefined(coll) ? acc : coll);
  let reduced = isUndefined(coll) ? iter.next().value : acc;
  for (const value of iter) {
    reduced = iteratee(reduced, value);
  }
  return reduced;
});

/**
 * reduceR :: Collection c => ((a, b) -> a) -> a -> c b -> a
 * reduceR :: ((a, String) -> a) -> a -> String -> a
 */
export const reduceR = curry2((iteratee, acc, coll) =>
  isUndefined(coll)
    ? reduce(iteratee, reverse(acc))
    : reduce(iteratee, acc, reverse(coll)));

/**
 * map :: Functor f => (a -> b) - f a -> f b
 */
export const map = curry2((iteratee, functor) => {
  if (isArray(functor)) return functor.map(iteratee);
  if (isPlainObject(functor) || isArrayLike(functor)) return reduce((obj, key) => {
    obj[key] = iteratee(functor[key], key, functor);
    return obj;
  }, {}, Object.keys(functor));
  if (isPromise(functor)) return functor.then(iteratee);
  if (isMap(functor)) return reduce((m, [key, val]) => {
    m.set(key, iteratee(val, key, functor));
    return m;
  }, new Map(), functor);
  if (isFunction(functor)) return (...a) => iteratee(functor(...a));
});

/**
 * filter:: Filterable f => (a -> Boolean) -> f a -> f a
 */
export const filter = curry2((predicate, coll) => pipe(L.filter(predicate), takeAll)(coll));

/**
 * forEach :: Collection c => (a -> ...) -> c a -> c a
 * forEach :: (a -> ...) -> String -> String
 */
export const forEach = curry2((iteratee, coll) => {
  if (isArray(coll)) {
    let idx = -1;
    while (++idx < coll.length) iteratee(coll[idx], idx, coll);
    return coll;
  }
  if (isPlainObject(coll)) {
    _runAllwithKeys(iteratee, Iter.keys(coll), coll);
    return coll;
  }
  if (isMap(coll)) {
    return coll.forEach(iteratee);
  }
  if (isIterable(coll)) _runAll(iteratee, Iter.values(Object(coll)), coll);
  return coll;
});

// result: slow.
// export const forEach = curry2((iteratee, coll) => reduce((a, c) => iteratee(c), null, coll));
// result: very slow.
// export const forEach = curry2((iteratee, coll) =>
//   pipe(L.loop(iteratee), takeAll, () => coll)(coll));

/**
 * eachR :: Collection c => (a -> ...) -> c a -> c a
 * eachR :: (a -> ...) -> String -> String
 */
export const forEachR = curry2((iteratee, coll) =>
  forEach(iteratee, isMap(coll) ? new Map(reverse(coll)) : reverse(coll)));
