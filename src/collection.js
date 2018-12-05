import { pipe } from './composition';
import { apply } from './application';
import {
  isArray, isString, isMap, isSet, isArrayLike, isObject,
} from './validation';

// flatten :: [a] -> Number -> [b]
export const flatten = (arr, depth = 1) => {
  const flat = list => list.reduce((a, c) => a.concat(c), []);
  return depth > 1 ? apply(pipe, Array(depth).fill(flat))(arr) : flat(arr);
};

// reverse :: Collenction c => c a => [a]
// reverse :: String => String
export const reverse = coll => {
  if (isArray(coll)) return coll.reverse();
  if (isString(coll))
    return coll
      .split('')
      .reverse()
      .join('');
  if (isMap(coll) || isSet(coll) || isArrayLike(coll)) return Array.from(coll).reverse();
  if (isObject(coll)) return Object.values(coll).reverse();
  return [];
};
