import { curryR } from './curry';
import { isIterable, isArrayLike } from './validation';

export const each = curryR((data, iteratee) => {
  if (typeof data.forEach === 'function') {
    data.forEach(iteratee);
    return data;
  } else if (isIterable(data)) {
    for(const val of data) {
      iteratee(val, null, data);
    }
    return data;
  } else if (isArrayLike(data)) {
    Array.from(data).forEach(iteratee);
    return data;
  }
  Object.keys(data).forEach(key => iteratee(data[key], key, data));
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

export const reduce = curryR((list, iteratee) => {
  if (typeof list.reduce === 'function') {
    return list.reduce(iteratee);
  }
});
