import { curry2 } from './curry';

/**
 * apply :: ([a] -> b) -> [a] -> b
 */
export const apply = curry2((f, a) => f(...a));

/**
 * call :: (a -> b) -> a -> b
 */
export const call = curry2((f, ...a) => f(...a));
