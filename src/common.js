export const identity = arg => arg;

export const nothing = () => {};

// types
export const isFunction = (...arg) => arg.every(fn => typeof fn === 'function');