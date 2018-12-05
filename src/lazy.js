import { Iter } from './iter';
import { curry2 } from './curry';

export const eachL = curry2(function* (interatee, coll) {
  for (const value of Iter.values(coll)) yield interatee(value);
});

export const L = {
  each: eachL,
};
