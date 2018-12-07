import { curry2 } from './curry';
import { pipe } from './composition';
import { takeAll } from './take';
import { Iter } from './iter';
import { L } from './lazy';
import {
  isUndefined, isFunction, isArray, isMap, isPromise, isPlainObject, isArrayLike,
} from './validation';
import { reverse } from './collection';

/**
 * Base
 */


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
export const map = curry2((iteratee, ft) => {
  if (isArray(ft)) return ft.map(iteratee);
  if (isPlainObject(ft) || isArrayLike(ft)) return reduce((obj, k) => {
    obj[k] = iteratee(ft[k], k, ft);
    return obj;
  }, {}, Object.keys(ft));
  if (isPromise(ft)) return ft.then(iteratee);
  if (isMap(ft)) return reduce((m, [k, v]) => {
    m.set(k, iteratee(v, k, ft));
    return m;
  }, new Map(), ft);
  if (isFunction(ft)) return (...a) => iteratee(ft(...a));
});

/**
 * filter:: Filterable f => (a -> Boolean) -> f a -> f a
 */
export const filter = curry2((predicate, coll) => pipe(L.filter(predicate), takeAll)(coll));

/**
 * forEach :: Collection c => (a -> ...) -> c a -> c a
 * forEach :: (a -> ...) -> String -> String
 */
// export const forEach = curry2((iteratee, coll) => {
//   if (isArray(coll) || isArrayLike(coll)) {
//     const len = coll.length;
//     let idx = 0;
//     while (idx < len) {
//       iteratee(coll[idx]);
//       idx += 1;
//     }
//   } else {
//     const iter = Iter.values(coll);
//     let cur = iter.next();
//     while (!cur.done) {
//       iteratee(cur.values);
//       cur = iter.next();
//     }
//   }
//   return coll;
// });

// result: slow.
export const forEach = curry2((iteratee, coll) => reduce((a, c) => iteratee(c), null, coll));

// result: slow.
// export const forEach = curry2((iteratee, coll) => pipe(
//   L.loop(iteratee),
//   takeAll,
//   () => coll,
// )(coll));

/**
 * eachR :: Collection c => (a -> ...) -> c a -> c a
 * eachR :: (a -> ...) -> String -> String
 */
export const eachR = curry2((iteratee, coll) => forEach(iteratee, reverse(coll)));
