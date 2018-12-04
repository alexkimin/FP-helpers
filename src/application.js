import { curry2 } from './curry';
import { isPromise } from './validation';

// apply :: ([a] → b) → [a] → b
export const apply = curry2((fn, a) => fn(...a));

// call :: (a → b) → a → b
export const call = curry2((fn, ...a) => fn(...a));

// export const then = arg => isPromise(arg) ?
