import { isFunction } from './validation';

export const memoize = (fn, hashFn) => {
  const _memo = (...a) => {
    const key = isFunction(hashFn) ? hashFn(...a) : JSON.stringify(a);
    const { cache } = _memo;
    if (cache.has(key)) return cache.get(key);
    const result = fn(...a);
    cache.set(key, result);
    return result;
  };
  _memo.cache = new Map();
  return _memo;
};
