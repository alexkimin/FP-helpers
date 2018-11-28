import { I, K } from './combinator';

// identity :: a -> a
export const identity = I;

// noop :: ... -> undefined
export const noop = K(undefined);
