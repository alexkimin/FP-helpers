import { pipe } from './composition';
import { apply } from './apply';
import { Iter } from './iter';
import { isString, isObject, isIterable, isArrayLike, isNumber, hasMethod, isPlainObject } from './validation';

/**
 * flatten :: [a] -> Number -> [b]
 */
export const flatten = (arr, depth = 1) => {
  const flat = list => list.reduce((a, c) => a.concat(c), []);
  return depth > 1 ? apply(pipe, Array(depth).fill(flat))(arr) : flat(arr);
};

/**
 * reverse :: Collenction c => c a -> [a]
 * reverse :: String => String -> String
 */
export const reverse = coll => {
  if (isString(coll)) return coll.split('').reverse().join('');
  if (isIterable(coll)) return [...coll].reverse();
  if (isObject(coll)) return Object.values(coll).reverse();
  return [];
};

/**
 * keys :: a -> [b]
 */
export const keys = (coll) => {
  // if (hasMethod(coll, 'keys')) return coll.keys();
  if (isPlainObject(coll)) return Object.keys(coll);
  if (isIterable(coll)) {
    const iter = Iter.keys(Object(coll));
    let cur = iter.next();
    let idx = 0;
    const _keys = [];
    while (!cur.done) {
      _keys[idx++] = cur.value;
      cur = iter.next();
    }
    return _keys;
  }
};
