import { curry } from './curry';

// base
export const apply = curry((fn, arg) => fn.apply(null, arg));

export const call = (fn, ...args) => fn.call(null, ...args);