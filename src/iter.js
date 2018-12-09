import { isIterable, hasMethod } from './validation';

const symbolExists = typeof Symbol !== 'undefined';

const protocols = {
  iterator: symbolExists ? Symbol.iterator : '@@iterator',
};

const _objIter = {};
_objIter.values = function* (coll) {
  for (const value of Object.values(Object(coll))) yield value;
};
_objIter.entries = function* (coll) {
  for (const key of Object.keys(Object(coll))) yield [key, coll[key]];
};
_objIter.keys = function* (coll) {
  for (const key of Object.keys(Object(coll))) yield key;
};

const _handleIterMethods = name => coll =>
  hasMethod(coll, name) ? coll[name]() : _objIter[name](coll);

export const Iter = {};
Iter.values = coll => (isIterable(coll) ? coll[protocols.iterator]() : _objIter.values(coll));
Iter.entries = coll => _handleIterMethods('entries')(coll);
Iter.keys = coll => _handleIterMethods('keys')(coll);
