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

// todo: transducer

/**
 * base
 */
const _runAll = (fn, iterator, coll) => {
  let cur = iterator.next();
  let idx = 0;
  while (!cur.done) {
    fn(cur.value, idx++, coll);
    cur = iterator.next();
  }
};
const _runAllWithKeys = (fn, iterator, coll) => {
  let cur = iterator.next();
  while (!cur.done) {
    fn(coll[cur.value], cur.value, coll);
    cur = iterator.next();
  }
};
const _map = (iteratee, functor) => {
  const { length } = functor;
  const arr = Array(length);
  let idx = -1;
  while (++idx < length) arr[idx] = iteratee(functor[idx], idx, functor);
  return arr;
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
  // if (isArray(functor)) return functor.map(iteratee);
  if (isArray(functor)) return _map(iteratee, functor);
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
 * forEach :: Collection c => (a -> ...) -> c a -> c a
 * forEach :: (a -> ...) -> String -> String
 */
export const forEach = curry2((iteratee, coll) => {
  if (isArray(coll)) {
    // coll.forEach(iteratee);
    let idx = -1;
    while (++idx < coll.length) iteratee(coll[idx], idx, coll);
    return coll;
  }
  if (isPlainObject(coll)) {
    // Object.keys(coll).forEach(key => iteratee(coll[key], key, coll));
    _runAllWithKeys(iteratee, Iter.keys(coll), coll);
    return coll;
  }
  if (isMap(coll)) {
    coll.forEach(iteratee);
    return coll;
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

/**
 * filter:: Filterable f => (a -> Boolean) -> f a -> f a
 */
export const filter = curry2((predicate, coll) => pipe(L.filter(predicate), takeAll)(coll));
