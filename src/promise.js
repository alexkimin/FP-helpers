import { curry2, curry } from './curry';

/**
 * then :: Promise p => (a -> p b) -> p a -> p b;
 */
export const then = curry2((f, p) => p.then(f));

/**
 * otherwise :: Promise p => (a -> p b) -> p a -> p b;
 */
export const otherwise = curry2((f, p) => p.catch(f));

/**
 * thenCatch :: Promise p => (a -> p b) -> (a -> p b) -> p a -> p b;
 */
export const thenCatch = curry((t, c, p) => p.then(t).catch(c));
