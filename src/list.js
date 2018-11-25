import { pipe } from './composition';
import { apply } from './application';

export const flatten = (arr, depth = 1) => {
  const flat = list => list.reduce((a, c) => a.concat(c), []);
  return depth > 1
    ? apply(pipe, Array(depth).fill(flat))(arr)
    : flat(arr);
};
