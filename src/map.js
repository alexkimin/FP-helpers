import { curryR, curry, curry2 } from './curry';
import {
  isIterable,
  isArrayLike,
  isObject,
  isFunctor,
} from './validation';
import { iterValues, iterEntries } from './iter';

export const each = curryR((data, iteratee) => {
  switch (true) {
    case typeof data.forEach === 'function':
      data.forEach(iteratee);
      break;
    case isIterable(data):
      for(const val of data) {
        iteratee(val, null, data);
      }
      break;
    case isArrayLike(data):
      Array.from(data).forEach(iteratee);
      break;
    case isObject(data):
      Object.keys(data).forEach(key => iteratee(data[key], key, data));
      break;
    default:
      break;
  }
  return data;
});

export const eachR = curryR((data, iteratee) => {
  if (Array.isArray(data)) {
    data.reverse().forEach(iteratee);
    return data;
  } else if (data instanceof Map) {
    Array.from(data).reverse().forEach(keyvalue => {
      iteratee(keyvalue[1], keyvalue[0], data);
    });
    return data;
  } else if (isIterable(data)) {
    for(const val of Array.from(data).reverse()) {
      iteratee(val, null, data);
    }
    return data;
  } else if (isArrayLike(data)) {
    Array.from(data).reverse().forEach(iteratee);
    return data;
  } else if (isObject(data)) {
    Object.keys(data).reverse().forEach(key => iteratee(data[key], key, data));
    return data;
  }
  return data;
});

// map :: Functor f => (a -> b) -> f a -> f b
export const map = curryR((list, iteratee) => {
  if (typeof list.map === 'function') {
    return list.map(iteratee);
  } else {
    const newList = [];
    isFunctor(list) && each(list, value => newList.push(iteratee(value)));
    return newList;
  }
});

export const filter = curryR((list, predicate) => {
  if (typeof list.filter === 'function') {
    return list.filter(predicate);
  } else {
    const newList = [];
    each(list, e => predicate(e) && newList.push(e));
    return newList;
  }
});

// reduce :: Collection c => ((a, b) -> a) -> a -> c b -> a
export const reduce = curry2((iteratee, acc, coll) => {
  const collection = coll === undefined ? acc : coll;
  const iter = iterValues(collection);
  let reduced = coll === undefined ? iter.next().value : acc;
  for(const value of iter) {
    reduced = iteratee(reduced, value);
  }
  return reduced;
});

export const reduceR = curryR((data, iteratee, init) => {
  if (typeof data.reduce === 'function') {
    return data.reduceRight(iteratee, init);
  } else if (isArrayLike(data)) {
    const original = Array.from(data);
    const [last] = original.slice(-1);
    const rest = original.slice(0, -1);
    let reduced = init;
    const list = init === undefined ? rest : original;
    eachR(list, (value, key) => {
      reduced = iteratee(reduced, value, key);
    });
    return reduced;
  } else if (isIterable(data) || isObject(data)) {
    let reduced = init;
    eachR(data, (value, key) => {
      reduced = iteratee(reduced, value, key);
    });
    return reduced;
  }
  return init;
});
