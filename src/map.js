import { curryR } from './curry';

export const each = curryR((data, iteratee) => {
  if (typeof data.forEach === 'function') {
    data.forEach(iteratee);
  } else {
    for (let key in data) {
      data.hasOwnProperty(key) && iteratee(data[key], key, data);
    }
  }
  return data;
});

export const map = curryR((list, iteratee) => {
  const newList = []
  each(list, (value) => newList.push(iteratee(value)))
  return newList;
});

