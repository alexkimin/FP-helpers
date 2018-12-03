import { curry2 } from './curry';

// base
export const apply = curry2((fn, arg) => fn(...arg));

export const call = curry2((fn, ...args) => fn(...args));
