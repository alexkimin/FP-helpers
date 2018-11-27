import { curryR } from './curry';
import { isIterable, isArrayLike, isObject } from './validation';

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

export const map = curryR((list, iteratee) => {
  if (typeof list.map === 'function') {
    return list.map(iteratee);
  } else {
    const newList = [];
    each(list, value => newList.push(iteratee(value)));
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

export const reduce = curryR((data, iteratee, init) => {
  if (typeof data.reduce === 'function') {
    return data.reduce(iteratee, init);
  } else if (isArrayLike(data)) {
    const [first, ...rest] = Array.from(data);
    let reduced = init;
    const list = init === undefined ? rest : [first, ...rest];
    each(list, (value, key) => {
      reduced = iteratee(reduced, value, key);
    });
    return reduced;
  } else if (isIterable(data) || isObject(data)) {
    let reduced = init;
    each(data, (value, key) => {
      reduced = iteratee(reduced, value, key);
    });
    return reduced;
  }
  return init;
});

export const reduceR = curryR((data, iteratee, init) => {
  if (typeof data.reduce === 'function') {
    return data.reduceRight(iteratee, init);
  } else if (isArrayLike(data)) {
    const original = Array.from(data);
    const [last] = original.slice(-1);
    const rest = original.slice(0, -1);
    let reduced = init;
    const list = init === undefined ? rest : [...rest, last];
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
