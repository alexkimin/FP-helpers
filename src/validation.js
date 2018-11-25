// types
export const isFunction = (...arg) => arg.every(fn => typeof fn === 'function');

// protocol
export const isIterable = arg => Symbol.iterator in Object(arg);