import { isIterable, hasMethod } from './validation';

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
  hasMethod(coll, name) ? coll[name]() : _iter[name](coll);

export const Iter = {};
Iter.values = coll => (isIterable(coll) ? coll[Symbol.iterator]() : _iter.values(coll));
Iter.entries = coll => _handleIterMethods('entries')(coll);
Iter.keys = coll => _handleIterMethods('keys')(coll);
