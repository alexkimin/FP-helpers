import { curry2 } from './curry';
import { Iter } from './iter';
import {
  isUndefined, isFunction, isArray, isMap, isSet, isPromise,
  isPlainObject, isArrayLike, isIterable,
} from './validation';
import { reverse } from './collection';
import _tWrap from './transducer/xWrap';

/**
 * base
 */
const _each = (fn, iterator, coll) => {
  let cur = iterator.next();
  let idx = 0;
  while (!cur.done) {
    fn(cur.value, idx++, coll);
    cur = iterator.next();
  }
};
const _eachWithKeys = (fn, iterator, coll) => {
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
const _filter = (predicate, filterable) => {
  const { length } = filterable;
  const arr = [];
  let idx = -1;
  let filteredIdx = 0;
  while (++idx < length)
    if (predicate(filterable[idx], idx, filterable))
      arr[idx] = filterable[filteredIdx++];
  return arr;
};
const _xReduceIndex = (fx, acc, arr, idx) => {
  const len = arr.length;
  while (idx < len) {
    acc = fx['@@transducer/step'](acc, arr[idx++], idx);
  }
  return fx['@@transducer/result'](acc);
};
const _xReduceKey = (fx, acc, obj, idx, keys) => {
  const len = keys.length;
  while (idx < len) {
    acc = fx['@@transducer/step'](acc, obj[keys[idx]], keys[idx++]);
  }
  return fx['@@transducer/result'](acc);
};
const _xReduceIter = (fx, acc, iter) => {
  let cur = iter.next();
  while (!cur.done) {
    acc = fx['@@transducer/step'](acc, cur.value);
    cur = iter.next();
  }
  return fx['@@transducer/result'](acc);
};

/**
 * reduce :: Collection c => ((a, b) -> a) -> a -> c b -> a
 * reduce :: ((a, String) -> a) -> a -> String -> a
 */
// export const reduce = curry2((iteratee, acc, coll) => {
//   const collection = isUndefined(coll) ? acc : coll;
//   iteratee = _tWrap(iteratee);
//   if (isArray(collection) || isArrayLike(collection)) {
//     const accum = isUndefined(coll) ? collection[0] : acc;
//     const idx = isUndefined(coll) ? 1 : 0;
//     return _xReduceIndex(iteratee, accum, collection, idx);
//   }
//   if (isPlainObject(collection)) {
//     const keys = Object.keys(collection);
//     const accum = isUndefined(coll) ? collection[keys[0]] : acc;
//     const idx = isUndefined(coll) ? 1 : 0;
//     return _xReduceKey(iteratee, accum, collection, idx, keys);
//   }
//   if (isIterable(collection)) {
//     const iter = Iter.values(collection);
//     const accum = isUndefined(coll) ? iter.next().value : acc;
//     return _xReduceIter(iteratee, accum, iter);
//   }
// });
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
    _eachWithKeys(iteratee, Iter.keys(coll), coll);
    return coll;
  }
  if (isMap(coll)) {
    coll.forEach(iteratee);
    return coll;
  }
  if (isIterable(coll)) _each(iteratee, Iter.values(coll), coll);
  return coll;
});

/**
 * eachR :: Collection c => (a -> ...) -> c a -> c a
 * eachR :: (a -> ...) -> String -> String
 */
export const forEachR = curry2((iteratee, coll) =>
  forEach(iteratee, isMap(coll) ? new Map(reverse(coll)) : reverse(coll)));

/**
 * filter:: Filterable f => (a -> Boolean) -> f a -> f a
 */
export const filter = curry2((predicate, filterable) => {
  let idx = 0;
  if (isArray(filterable)) return _filter(predicate, filterable);
  if (isPlainObject(filterable) || isArrayLike(filterable)) return reduce((obj, key) => {
    if (predicate(filterable[key], key, filterable)) obj[key] = filterable[key];
    return obj;
  }, {}, Object.keys(filterable));
  if (isMap(filterable)) return reduce((m, [key, val]) => {
    if (predicate(val, key, filterable)) m.set(key, val);
    return m;
  }, new Map(), filterable);
  if (isSet(filterable)) return reduce((s, val) => {
    if (predicate(val, idx++, filterable)) s.add(val);
    return s;
  }, new Set(), filterable);
});
