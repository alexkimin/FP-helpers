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
  if (typeof list.map === 'function') {
    return list.map(iteratee);
  } else {
    const newList = []
    each(list, (value) => newList.push(iteratee(value)))
    return newList;
  }
});

export const filter = curryR((list, predicator) => {
  if (typeof list.filter === 'function') {
    return list.filter(predicator);
  } else {
    const newList = []
    each(list, (e) => predicator(e) && newList.push(e))
    return newList
  }
})