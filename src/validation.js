// types
export const isFunction = (...arg) => arg.every(fn => typeof fn === 'function');

export const isIterable = arg => Symbol.iterator in Object(arg);

export const isPromise = (promise) => {
  if (!promise) return false;
  return !!(promise.then && promise.catch);
};
