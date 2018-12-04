import { curry2 } from './curry';
import { isPromise } from './validation';

export const apply = curry2((fn, arg) => fn(...arg));
export const call = curry2((fn, ...args) => fn(...args));

// export const then = arg => isPromise(arg) ?
