import { Iter } from './iter';

export const eachL = function* (interatee, coll) {
  for(const key of Iter.keys(coll)) yield interatee(coll[key], key, coll);
};

export const L = {
  each: eachL,
};