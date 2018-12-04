import { isIterable, hasMethod } from './validation';

// todo: check weight of the decision
// #1 for in + hasOwnProperty : too slow
// #2 for in : iteration on prototype chain.
// #3 Object.value: faster than #1 and Object.keys(), but create an array.
const _iter = {};
_iter.values = function* (coll) {
  for (const value of Object.values(coll)) yield value;
};
_iter.entries = function* (coll) {
  for (const key of Object.keys(coll)) yield [key, coll[key]];
};
_iter.keys = function* (coll) {
  for (const key of Object.keys(coll)) yield key;
};

const _handleIterMethods = name => coll =>
  hasMethod(coll, name)
    ? coll[name](coll)
    : _iter[name](coll);

export const Iter = {};
Iter.values = coll => isIterable(coll) ? coll[Symbol.iterator]() : _iter.values(coll);
Iter.entries = coll => _handleIterMethods('entries')(coll);
Iter.keys = coll => _handleIterMethods('keys')(coll);
