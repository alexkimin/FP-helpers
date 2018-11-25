import { curryR } from './curry';

export const each = curryR((data, iteratee) =>
  typeof data.forEach === 'function'
    ? data.forEach(iteratee)
    : Object.keys(data).forEach(key => iteratee(data[key], key, data)));

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
