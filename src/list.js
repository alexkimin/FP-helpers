import { pipe } from './composition';
import { apply } from './application';

export const flatten = (arr, depth = 1) => {
  const _flat = list => list.reduce((a, c) => a.concat(c), []);
  return depth > 1
    ?  apply(pipe, Array(depth).fill(_flat))(arr)
    : _flat(arr);
};