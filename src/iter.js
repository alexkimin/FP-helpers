import { isIterable, isObject } from './validation';

const _iter = {};
_iter.values = function* (coll) {
  if (!coll) return;
  for (const key in coll) yield coll[key];
};
_iter.entries = function* (coll) {
  if (!coll) return;
  for (const key in coll) yield [key, coll[key]];
};
_iter.keys = function* (coll) {
  if (!coll) return;
  for (const key in coll) yield key;
};

// iterator[Symbol.iterator]() == iterator
const _handleCollAsIter = name => coll =>
  isIterable(coll)
    ? coll[typeof coll[name] === 'function' ? name : Symbol.iterator]()
    : isObject(coll)
      ? _iter[name](coll)
      : coll;

export const Iter = {
  values: _handleCollAsIter('values'),
  entries: _handleCollAsIter('entries'),
  keys: _handleCollAsIter('keys'),
};