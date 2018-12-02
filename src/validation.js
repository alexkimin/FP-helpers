export const isString = arg => typeof arg === 'string';

// {}, [], Map, Set, String, Number ...
export const isObject = arg => typeof arg === 'object';

export const isArray = arg => Array.isArray(arg);

// Function, Promise
export const isFunction = fn => typeof fn === 'function';

/**
 * True: Array, Map, Set, Generator object, String
 * Iterable: The iterable is a interface that specifies that an object can be accessible
 * if it implements a method who is key is [symbol.iterator]
 */
export const isIterable = arg => Symbol.iterator in Object(arg);

export const isGenerator = fn => isFunction(fn)
  && ['GeneratorFunction', 'AsyncGeneratorFunction'].includes(fn.constructor.name)

export const isMap = arg => arg instanceof Map;

export const isSet = arg => arg instanceof Set;

// [], {}, Map, Promise, Function, ArrayLike
// functors must preserve identity morphisms and composition of morphisms.
export const isFunctor = arg => {
  if (!arg) return false;
  return !isSet(arg) && (isObject(arg) || isFunction(arg));
};

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
