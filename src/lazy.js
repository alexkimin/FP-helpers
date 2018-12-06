import { Iter } from './iter';
import { curry2 } from './curry';

export const loopL = curry2(function* (interatee, coll) {
  for (const value of Iter.values(coll)) yield interatee(value);
});

export const mapL = loopL;

export const filterL = curry2(function* (predicate, coll) {
  for (const value of Iter.values(coll))
    if (predicate(value)) yield value;
});


export const L = {
  loop: loopL,
  map: loopL,
  filter: filterL,
};
