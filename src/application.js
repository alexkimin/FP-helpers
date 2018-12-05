import { curry2 } from './curry';
import { isPromise } from './validation';

/**
 * apply :: ([a] -> b) -> [a] -> b
 */
export const apply = curry2((f, a) => f(...a));

/**
 * call :: (a -> b) -> a -> b
 */
export const call = curry2((f, ...a) => f(...a));

/**
 * then :: Promise p => (a -> b | p b) -> e a -> e b;
 */
export const then = curry2((f, p) => p.then(f));

/**
 * run :: Promise p => (a -> b | p b) -> a | e a -> b | e b;
 */
// export const run = curry2((f, a) => isPromise(a) ? a.then(f) : f(a));
