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
 * applyE :: Promise p => (a -> b | p b) -> a | e a -> b | e b;
 */
export const applyE = curry2((f, a) => isPromise(a) ? a.then(f) : f(a));
