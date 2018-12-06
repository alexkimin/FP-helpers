import { curry2 } from './curry';

// identity :: a -> a
export const identity = a => a;

// noop :: a -> undefined
export const noop = () => { };

// tap :: (a -> *) -> a -> a
export const tap = curry2((f, a) => {
  f(a);
  return a;
});
