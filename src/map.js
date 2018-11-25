import { isIterable } from './validation';

export const each = (data, iteratee) => {
  if (typeof data.forEach === 'function') {
    data.forEach(iteratee);
  } else {
    for (let key in data) {
      data.hasOwnProperty(key) && iteratee(data[key], key, data);
    }
  }
  return data;
}