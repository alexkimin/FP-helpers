import { pipe } from './composition';
import { apply } from './apply';
import { isString, isObject, isIterable } from './validation';

// flatten :: [a] -> Number -> [b]
export const flatten = (arr, depth = 1) => {
  const flat = list => list.reduce((a, c) => a.concat(c), []);
  return depth > 1 ? apply(pipe, Array(depth).fill(flat))(arr) : flat(arr);
};

// reverse :: Collenction c => c a -> [a]
// reverse :: String => String -> String
export const reverse = coll => {
  if (isString(coll)) return coll.split('').reverse().join('');
  if (isIterable(coll)) return [...coll].reverse();
  if (isObject(coll)) return Object.values(coll).reverse();
  return [];
};
