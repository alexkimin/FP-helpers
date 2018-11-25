// types
export const isString = arg => typeof arg === 'string';

export const isObject = arg => typeof arg === 'object';

export const isFunction = (...arg) => arg.every(fn => typeof fn === 'function');

export const isIterable = arg => Symbol.iterator in Object(arg);

export const isArrayLike = (arg) => {
  if (!arg) return false;
  if (Array.isArray(arg)) return true;
  if (!isObject(arg)) return false;
  if (arg.nodeType === 1) return !!arg.length;
  if (arg.length === 0) return true;
  if (arg.length > 0) return Object.prototype.hasOwnProperty.call(arg, 0)
    && Object.prototype.hasOwnProperty.call(arg, arg.length - 1);
  return false;
};

export const isPromise = (promise) => {
  if (!promise) return false;
  return !!(promise.then && promise.catch);
};
