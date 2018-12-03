import { curry2 } from './curry';
import { isIterable, isObject } from './validation';

export const genToIter = curry2((generator, coll, iter = generator(coll)) => ({
  next: () => iter.next(),
  // iterator[Symbol.iterator]() == iterator
  [Symbol.iterator]() { return this },
}));

const _iter = {
  ...genToIter,
  values: genToIter(function* (coll) {
    if (!coll) return;
    for (const key in coll) yield coll[key];
  }),
  entries: genToIter(function *(coll) {
    if (!coll) return;
    for (const key in coll) yield [key, coll[key]];
  })
};

const _getIterMethod = name => coll =>
  isIterable(coll)
    ? coll[typeof coll[name] === 'function' ? name : Symbol.iterator]()
    : isObject(coll)
      ? _iter[name](coll)
      : coll;

export const iterValues = _getIterMethod('values');

export const iterEntries = _getIterMethod('entries');