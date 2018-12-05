import { curry, curryR, curry2 } from './curry';
import { pipe } from './composition';
import { takeAll } from './take';
import { Iter } from './iter';
import { L } from './lazy';
import {
  isIterable, isArrayLike, isObject, isFunctor, isUndefined,
} from './validation';
import { reverse } from './collection';

// each :: Collection c => (a -> ...) -> c a -> c a
// each :: (a -> ...) -> String -> String
export const each = curry2((iteratee, coll) => {
  pipe(
    L.each(iteratee),
    takeAll,
  )(coll);
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
